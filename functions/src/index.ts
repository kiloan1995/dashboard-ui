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
import { ApplicationStateType, ApplicationState, Application, ApplicationStats, GetApplicationReponse, SuccessFactorsService } from './models';
import { start } from 'repl';
import { mapState } from './models/StateMapping';

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

    for (let app of apps) {
      let states = convertStates(app);
      let stats: ApplicationStats = {
        timeFromAppliedToInterview: calculateTimeTill(states, ApplicationStateType.STATE_INTERVIEW),
        timeInterviewToHired: calculateTimeTill(states, ApplicationStateType.STATE_HIRED),
        timeInterviewToRejected: calculateTimeTill(states, ApplicationStateType.STATE_REJECTED || calculateTimeTill(states, ApplicationStateType.STATE_WITHDRAWN)),
        hasReachedFinalState: containsAnyFinalState(states),
      };

      let response: GetApplicationReponse = {
        applicationID: app.applicationId,
        jobTitle: '',
        candidateName: '',
        stateList: [],
        stats: stats,
      };

      let dbApp: Application = {
        ID: app.applicationId,
        candidateName: app.firstName + ' ' + app.lastName,
        jobID: app.jobReqId,
        jobTitle: 'unknown',
        states: states,
        timeSpans: response,
      };
      arr.push(dbApp);
    }
  }
  return arr;
});

function convertStates(application: any): ApplicationState[] {
  let list: ApplicationState[] = [];

  application.jobApplicationStatusAuditTrail.results.forEach((result: any) => {
    let sfStateName = result.jobAppStatus.appStatusName;
    list.push({ stateNameInSF: sfStateName, state: mapState(sfStateName), date: new Date() }); //@TODO write helper dateformatter
  });
  return list;
}

function containsAnyFinalState(states: ApplicationState[]): boolean {
  if (!states) return false;
  for (let state of states) {
    if (ApplicationStateType.isFinalState(state.state)) return true;
  }
  return false;
}

/**Returns time in Minutes */
function calculateTimeTill(states: ApplicationState[], targetState: ApplicationStateType): number | undefined {
  let startDate: Date | null = null;
  let endDate: Date | null = null;
  for (let state of states) {
    if (state.state == ApplicationStateType.STATE_INTERVIEW) startDate = state.date;
    if (state.state == targetState) endDate = state.date;
  }
  if (startDate && endDate) {
    return endDate.getTime() - startDate.getTime() * 1000 * 60; // milliseonds to minutes
  }
  return undefined;
}
