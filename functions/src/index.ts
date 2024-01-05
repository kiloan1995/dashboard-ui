import { onCall, onRequest } from 'firebase-functions/v2/https';
import { onDocumentWritten } from 'firebase-functions/v2/firestore';
import * as admin from 'firebase-admin';
import { CustomerService } from './models/Services/CustomerService';
import { Application, ApplicationStats, SuccessFactorsService, DatabaseService } from './models';
import { StatMgr } from './models/StatMgr';
import { Customer } from './models/Customer';
import { ApplicationTimeStat } from './models/Stats';
import * as logger from 'firebase-functions/logger';
import { ServerSettings } from './ServerSettings';
/**
 * Import function triggers from their respective submodules: *
 * import {onDocumentWritten} from "firebase-functions/v2/firestore"; *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

admin.initializeApp();
admin.firestore().settings({
  ignoreUndefinedProperties: true,
});

export const onWorkerInit = onCall({ timeoutSeconds: 300, region: ServerSettings.serverRegion }, async request => {
  let service = new CustomerService();
  let customerList = await service.getCustomerList();

  let appList: Application[] = [];

  for (const customer of customerList) {
    let SFService = new SuccessFactorsService(customer);
    const appResponse = await SFService.getModifiedApplications();
    let apps = (await appResponse.json()).d?.results;

    let dbHelper = new DatabaseService(customer);
    logger.log('Application count from Successfactors: ', apps.length);
    for (let app of apps) {
      let statusList = dbHelper.convertStatuses(app);
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

export const onApplicationUpdated = onDocumentWritten({ region: ServerSettings.serverRegion, document: 'customers/{customer}/applications/{appId}' }, async request => {
  let app: Application = request?.data?.after.data() as Application;
  if (!app) return;

  let customerService = new CustomerService();
  let customer: Customer = await customerService.getCustomer(request.params.customer);
  let dbService = new DatabaseService(customer);
  // let apps: Application[] = await dbService.getAllApplicationsAtJob(request.params.customer, app.jobId);

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

export const getApplication = onRequest({ timeoutSeconds: 300, region: ServerSettings.serverRegion }, async (request, response) => {
  const customerName = 'mms-staging';
  const customerService = new CustomerService();
  const customer = await customerService.getCustomer(customerName);
  const dbHelper = new DatabaseService(customer);
  let application = await dbHelper.getApplication(customerName, request.body?.applicationId);
  response.json({ application });
});

export const getAllApplicationsAtJob = onRequest({ timeoutSeconds: 300, region: ServerSettings.serverRegion }, async (request, response) => {
  const customerName = 'mms-staging';
  const customerService = new CustomerService();
  const customer = await customerService.getCustomer(customerName);
  const dbHelper = new DatabaseService(customer);
  let applications: Application[] = await dbHelper.getAllApplicationsAtJob(customerName, request.body?.jobId);
  response.json({ applications });
});
