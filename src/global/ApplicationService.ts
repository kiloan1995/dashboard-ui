import { Application } from '../../functions/src/models/Application';
import { ServerSettings } from '../../functions/src/ServerSettings';
import fetch from 'node-fetch';

export class ApplicationService {
  static async getApplication(appId: string): Promise<Application | undefined> {
    return (await this.doRequest('application/json', { applicationId: appId }, 'getApplication', 'application')) as Application;
  }

  static async getApplicationsAtJob(jobId: string): Promise<Application[] | undefined> {
    return (await this.doRequest('application/json', { jobId: jobId }, 'getAllApplicationsAtJob', 'applications')) as Application[];
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
}
