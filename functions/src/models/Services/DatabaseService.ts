import { Application } from '../Application';
import { Customer } from '../Customer';
import * as admin from 'firebase-admin';

export class DatabaseService {
  constructor(private customer: Customer) {}
  async writeApplicationToDatabase(app: Application) {
    await admin.firestore().doc(`customers/${this.customer.id}/applications/${app.id}`).set(app, { merge: true });
  }
}
