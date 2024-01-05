import { Application } from '../../functions/src/models/Application';
import { ServerSettings } from '../../functions/src/ServerSettings';
import fetch from 'node-fetch';

export class ApplicationService {
  static async getApplication(appId: string): Promise<Application | undefined> {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      data: null,
    });

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    const url = 'http://127.0.0.1:5001/dashboardui-rs/' + ServerSettings.serverRegion + '/getApplication';
    const response = await fetch(url, requestOptions);
    let app: Application = undefined;
    try {
      let text = await response.text();
      let json = JSON.parse(text);
      app = json['result'] as Application; //unwrap promise
      console.log('getApplication Success:', app);
    } catch (e) {
      console.log('getApplication failed:', e);
    }
    return app;
  }

  static async getApplicationsAtJob(jobId: string): Promise<Application[] | undefined> {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    var raw = JSON.stringify({
      data: null,
    });
    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    const url = 'http://127.0.0.1:5001/dashboardui-rs/' + ServerSettings.serverRegion + '/getAllApplicationsAtJob';
    const response = await fetch(url, requestOptions);
    let apps: Application[] = undefined;
    try {
      let text = await response.text();
      console.log('getApplication Success:', text);
      let json = JSON.parse(text);
      apps = json['result'] as Application[]; //unwrap promise
      console.log('getApplication Success:', apps);
    } catch (e) {
      console.log('getApplication failed:', e);
    }
    return apps;
  }
}
