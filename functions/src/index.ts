import { onCall } from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';
admin.initializeApp();
/**
 * Import function triggers from their respective submodules:
 *
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import { onRequest } from 'firebase-functions/v2/https';
// import * as logger from 'firebase-functions/logger';
import { CustomerService } from './models/CustomerService';
import {
  ApplicationStateType,
  ApplicationState,
  Application,
  ApplicationStats,
  GetApplicationReponse,
  SuccessFactorsService,
} from './models';

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export const onApplicationUpdated = onCall(async request => {
  let service = new CustomerService();
  let list = await service.getCustomerList();

  let arr: Application[] = [];

  for (let index = 0; index < list.length; index++) {
    const customer = list[index];
    let SFService = new SuccessFactorsService(customer);
    const appResponse = await SFService.getModifiedApplications();
    let apps = (await appResponse.json()).d?.results;

    for (let i = 0; i < apps.length; i++) {
      const app = apps[i];
      let states = getStatesFromApp(app);

      let average: ApplicationStats = {
        hasReachedFinalState: false,
      };

      let tes: GetApplicationReponse = {
        applicationID: '',
        jobTitle: '',
        candidateName: '',
        stateList: [],
        stats: average,
      };

      let dbApp: Application = {
        ID: app.applicationId,
        candidateName: app.firstName + ' ' + app.lastName,
        jobID: app.jobReqId,
        jobTitle: 'unknown',
        states: states,
        timeSpans: tes,
      };
      arr.push(dbApp);
    }
  }
  return arr;
});

function getStatesFromApp(application: any): ApplicationState[] {
  let list: ApplicationState[] = [];

  application.jobApplicationStatusAuditTrail.results.forEach((result: any) => {
    list.push({ stateNameInSF: result.jobAppStatus.appStatusName, state: ApplicationStateType.STATE_APPLIED, date: new Date() }); //@TODO write helper dateformatter
  });
  return list;
}
