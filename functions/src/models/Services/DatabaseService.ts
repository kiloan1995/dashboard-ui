import { Application } from '../Application';
import { Customer } from '../Customer';
import * as admin from 'firebase-admin';
import { Job } from '../Job';

export class DatabaseService {
  constructor(private customer: Customer) {}
  async writeApplicationToDatabase(app: Application): Promise<void> {
    await admin.firestore().doc(`customers/${this.customer.id}/applications/${app.id}`).set(app, { merge: true });
  }

  async writeJobToDatabase(job: Job): Promise<void> {
    await admin.firestore().doc(`customers/${this.customer.id}/jobs/${job.jobId}`).set(job, { merge: true });
  }

  async getAllApplicationsAtJob(customerName: string, jobId: string): Promise<Application[]> {
    let result = await admin.firestore().collection(`customers/${customerName}/applications/`).where('jobId', '==', jobId).get();

    let appList: Application[] = [];

    for (const document of result.docs) {
      const item: Application = {
        ...(document.data() as Application),
        id: document.id, // id is not returned....
      };
      appList.push(item);
    }
    return appList;
  }

  async getJob(customerName: string, jobId: string): Promise<Job | undefined> {
    let result = await admin.firestore().collection(`customers/${customerName}/jobs/`).where('jobId', '==', jobId).get();

    for (const document of result.docs) {
      const item: Job = {
        ...(document.data() as Job),
        jobId: document.id, // id is not returned....
      };
      return item;
    }
    return undefined;
  }
}
