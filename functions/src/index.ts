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
  list.forEach(customer =>{
      let SFService = new SuccessFactorsService();
    SFService
    customer.
  })
  return list;
  //   logger.info('Hello logs!', { structuredData: true });
  //   data.send('Hello from Firebase!');
  //   let json = data.json;
});
