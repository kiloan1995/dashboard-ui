import { Application, ApplicationStatusType } from '../../functions/src/models/Application';
import { ServerSettings } from '../../functions/src/ServerSettings';
import fetch from 'node-fetch';
import { FunctionLibrary } from './FunctionLibrary';

export class ApplicationService {
  static async getApplication(appId: string): Promise<Application | undefined> {
    return (await this.doRequest('application/json', { applicationId: appId }, 'getApplication', 'application')) as Application;
  }

  static async getApplicationsAtJob(jobId: string, startDate: Date, endDate: Date): Promise<Application[] | undefined> {
    let apps: Application[] = (await this.doRequest('application/json', { jobId: jobId }, 'getAllApplicationsAtJob', 'applications')) as Application[];
    apps = apps.filter(app => {
      if (app.stats.hasReachedFinalStatus) {
        let closedDate = FunctionLibrary.timestampToDate(app.stats.closedDate);
        return closedDate >= startDate && closedDate <= endDate;
      }
      return true;
    });
    return apps;
  }

  static async doRequest(contentType: string, data: any, functionName: string, key: string): Promise<any | null> {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', contentType);
    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: 'follow',
    };
    const url = 'http://127.0.0.1:5001/dashboardui-rs/' + ServerSettings.serverRegion + '/' + functionName;
    const response = await fetch(url, requestOptions);
    try {
      let text = await response.text();
      console.log('getApplication Success:', text);
      let json = JSON.parse(text);
      return json[key];
    } catch (e) {
      console.log('getApplications failed:', e);
    }
    return null;
  }

  static findStatus(app: Application, type: ApplicationStatusType) {
    for (const status of app.statusArr) {
      if (status.status == type) return status;
    }
  }
}
