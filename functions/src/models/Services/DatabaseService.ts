import { Application, ApplicationStatus } from '../Application';
import { Customer } from '../Customer';
import * as admin from 'firebase-admin';
import { Job } from '../Job';
import { mapStatus } from '../StatusMapping';
import { DateHelper } from '../DateHelper';
import { StatMgr } from '../StatMgr';

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
  async getApplication(customerName: string, applicationId: string): Promise<Application | undefined> {
    let result = await admin.firestore().collection(`customers/${customerName}/applications/`).where('id', '==', applicationId).get();

    for (const document of result.docs) {
      const item: Application = {
        ...(document.data() as Application),
        id: document.id, // id is not returned....
      };
      return item;
    }
    return undefined;
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
  convertStatuses(application: any): ApplicationStatus[] {
    let list: ApplicationStatus[] = [];

    application.jobApplicationStatusAuditTrail.results.forEach((result: any) => {
      let sfStateName = result.jobAppStatus.appStatusName;
      list.push({ statusNameInSF: sfStateName, status: mapStatus(sfStateName), date: DateHelper.sfStringToDate(result.createdDateTime) });
    });
    return list;
  }

  async calculateAllJobsExpensive(customerName: string): Promise<Job[]> {
    let result = await admin.firestore().collection(`customers/${customerName}/applications/`).get();

    let jobList: Job[] = [];

    for (const document of result.docs) {
      const app: Application = {
        ...(document.data() as Application),
        id: document.id, // id is not returned....
      };
      let job: Job | undefined = jobList.find(job => job.jobId == app.jobId);
      let closedDate = Application.findClosedDate(app);
      if (!job) {
        job = {
          jobId: app.jobId,
          applicationIds: [app.id],
          jobTitle: app.jobTitle,
          templateName: '',
          timeStats: app.stats.timeStats,
          lastClosedApplicationDate: closedDate,
          timePostingDateTillFirstApplication: -1,
        };
        jobList.push(job);
      } else {
        job.applicationIds.push(app.id);
        job.timeStats = StatMgr.calcAverage(job.timeStats, app.stats.timeStats);
        if (closedDate && job.lastClosedApplicationDate) {
          if (closedDate > job.lastClosedApplicationDate) {
            job.lastClosedApplicationDate = closedDate;
          }
        }
      }
    }

    return jobList;
  }
}
