import { onCall } from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';
import { onDocumentWritten } from 'firebase-functions/v2/firestore';

admin.initializeApp();

admin.firestore().settings({
  ignoreUndefinedProperties: true,
});
/**
 * Import function triggers from their respective submodules:
 *
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import { onRequest } from 'firebase-functions/v2/https';
// import * as logger from 'firebase-functions/logger';
import { CustomerService } from './models/Services/CustomerService';
import { ApplicationStatus, Application, ApplicationStats, SuccessFactorsService, DatabaseService, Job, ApplicationStatusType } from './models';
import { mapStatus } from './models/StatusMapping';
import { StatMgr } from './models/StatMgr';
import { DateHelper } from './models/DateHelper';
import { Customer } from './models/Customer';
import { ApplicationTimeStat } from './models/Stats';

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export const onWorkerInit = onCall({ timeoutSeconds: 300, region: 'europe-west3' }, async request => {
  let service = new CustomerService();
  let customerList = await service.getCustomerList();

  let appList: Application[] = [];

  for (let customer of customerList) {
    let SFService = new SuccessFactorsService(customer);
    const appResponse = await SFService.getModifiedApplications();
    let apps = (await appResponse.json()).d?.results;

    let dbHelper = new DatabaseService(customer);
    for (let app of apps) {
      let statusList = convertStates(app);
      let stats: ApplicationStats = StatMgr.calculateAppStats(statusList);

      let dbApp: Application = {
        id: app.applicationId,
        candidateName: app.firstName + ' ' + app.lastName,
        jobTitle: app.jobRequisition.jobReqLocale.results[0]?.jobTitle,
        jobId: app.jobReqId,
        statusArr: statusList,
        stats: stats,
      };
      await dbHelper.writeApplicationToDatabase(dbApp);
      appList.push(dbApp);
    }
  }
  return appList;
});

function convertStates(application: any): ApplicationStatus[] {
  let list: ApplicationStatus[] = [];

  application.jobApplicationStatusAuditTrail.results.forEach((result: any) => {
    let sfStateName = result.jobAppStatus.appStatusName;
    list.push({ statusNameInSF: sfStateName, status: mapStatus(sfStateName), date: DateHelper.sfStringToDate(result.createdDateTime) });
  });
  return list;
}

export const onApplicationUpdated = onDocumentWritten('customers/{customer}/applications/{appId}', async request => {
  let app: Application = request?.data?.after.data() as Application;
  if (!app) return;

  let customerService = new CustomerService();
  let customer: Customer = await customerService.getCustomer(request.params.customer);
  let dbService = new DatabaseService(customer);
  let apps: Application[] = await dbService.getAllApplicationsAtJob(request.params.customer, app.jobId);

  let job = await dbService.getJob(request.params.customer, app.jobId);
  if (job) {
    job.applicationIds.push(app.id);
    job.timeStats = StatMgr.calcAverage(job.timeStats, app.stats.timeStats);
  } else {
    let timeStats: ApplicationTimeStat = {
      timeFromAppliedToInterview: app.stats.timeStats.timeFromAppliedToInterview,
      timeInterviewToHired: app.stats.timeStats.timeInterviewToHired,
      timeInterviewToRejected: app.stats.timeStats.timeInterviewToRejected,
    };
    job = {
      applicationIds: [app.id],
      jobId: app.id,
      jobTitle: app.jobTitle,
      timeStats: timeStats,
      lastClosedApplicationDate: Application.findClosedDate(app),
      timePostingDateTillFirstApplication: 0,
      templateName: 'unset',
    };
  }
  // job stats updaten.
});
