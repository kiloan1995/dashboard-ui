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
import { SuccessFactorsService } from './models';

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export const onApplicationUpdated = onCall(async request => {
  let service = new CustomerService();
  let list = await service.getCustomerList();
  for (let index = 0; index < list.length; index++) {
    const customer = list[index];
    let SFService = new SuccessFactorsService(customer);
    const list2 = await SFService.getStatusList();
    return list2.json();
  }
  return undefined;
});
