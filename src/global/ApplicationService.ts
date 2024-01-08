import { Application, ApplicationStatusType } from '../../functions/src/models/Application';

import { FunctionLibrary } from './FunctionLibrary';
import { RequestService } from './RequestService';

export class ApplicationService {
  static async getApplication(appId: string): Promise<Application | undefined> {
    return (await RequestService.doRequest('application/json', { applicationId: appId }, 'getApplication', 'application')) as Application;
  }

  static async getApplicationsAtJob(jobId: string, startDate: Date, endDate: Date): Promise<Application[] | undefined> {
    let apps: Application[] = (await RequestService.doRequest('application/json', { jobId: jobId }, 'getAllApplicationsAtJob', 'applications')) as Application[];
    apps = apps.filter(app => {
      if (app.stats.hasReachedFinalStatus) {
        let closedDate = FunctionLibrary.timestampToDate(app.stats.closedDate);
        return closedDate >= startDate && closedDate <= endDate;
      }
      return true;
    });
    return apps;
  }

  static findStatus(app: Application, type: ApplicationStatusType) {
    for (const status of app.statusArr) {
      if (status.status == type) return status;
    }
  }
}
