import { Application } from '../../functions/src/models/Application';
import { ServerSettings } from '../../functions/src/ServerSettings';
import fetch from 'node-fetch';

export class ApplicationService {
  static async getApplication(appId: string): Promise<Application | undefined> {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    let data = { applicationId: appId };

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: 'follow',
    };
    const url = 'http://127.0.0.1:5001/dashboardui-rs/' + ServerSettings.serverRegion + '/getApplication';
    const response = await fetch(url, requestOptions);
    let app: Application = undefined;
    try {
      let text = await response.text();
      let json = JSON.parse(text);
      app = json['application'] as Application; //unwrap promise
      console.log('getApplication Success:', app);
    } catch (e) {
      console.log('getApplication failed:', e);
    }
    return app;
  }

  static async getApplicationsAtJob(jobId: string): Promise<Application[] | undefined> {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    let data = { jobId: jobId };
    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: 'follow',
    };
    const url = 'http://127.0.0.1:5001/dashboardui-rs/' + ServerSettings.serverRegion + '/getAllApplicationsAtJob';
    const response = await fetch(url, requestOptions);
    let apps: Application[] = undefined;
    try {
      let text = await response.text();
      console.log('getApplication Success:', text);
      let json = JSON.parse(text);
      apps = json['applications'] as Application[]; //unwrap promise
      console.log('getApplications Success:', apps);
    } catch (e) {
      console.log('getApplications failed:', e);
    }
    return apps;
  }
}
