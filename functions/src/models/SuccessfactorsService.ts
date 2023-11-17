import { IDashboardRequest, IDashboardResponse } from './DashboardModels';
import { ICustomer } from './Database';
import { IGetApplicationDataRequest, IGetApplicationDataReponse } from './RequestObject';

export class SuccessFactorsService {
  constructor(private customer: ICustomer) {}
  async getAllChangedApplications(lastRunDate?: Date) {}

  getApplicationData(request: IGetApplicationDataRequest): IGetApplicationDataReponse | undefined {
    return undefined;
  }

  // private aggregate(list: IGetApplicationDataReponse[]): IGetApplicationDataAggregatedReponse | undefined {
  //   return undefined;
  // }

  // private getApplicationsPerJob(request: IGetJobDataRequest): IGetJobDataResponse | undefined {
  //   // let appIDs: string[] = [];
  //   // let data: IGetJobDataResponse = new IGetJobDataResponse();
  //   // data.applications = [];
  //   // appIDs.forEach(ID => data.applications.push(this.getApplicationData({ applicationID: ID })));
  //   // data.aggregated = this.aggregate(data.applications);
  //   return undefined;
  // }

  private generateEncodedFormString(details: any) {
    const formBody: any[] = [];
    for (const property in details) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    const requestString = formBody.join('&');
    return requestString;
  }

  private async getSAMLToken(customer: ICustomer) {
    const details: any = {
      client_id: customer.clientID,
      user_id: customer.userID,
      token_url: customer.apiUrl + 'oauth/token',
      private_key: customer.apiKey,
    };

    const requestString = this.generateEncodedFormString(details);

    const url = `${this.customer.apiUrl}oauth/idp`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: requestString,
    });
    const result = await response.text();

    if (response.status > 299) {
      // this.logger.error(`Error during getSAMLToken`, { result, apiHeader: this.apiKeyHeader, tokenBaseUrl: this.tokenBaseUrl });
      throw new Error(result);
    }
    return result;
  }

  async getAuthHeader() {
    const token = await this.getBearerToken(this.customer);
    return `Bearer ${token}`;
  }

  private async getBearerToken(customer: ICustomer) {
    const samlToken = await this.getSAMLToken(customer);
    if (samlToken) {
      const details: any = {
        company_id: customer.companyID,
        client_id: customer.clientID,
        user_id: customer.userID,
        grant_type: 'urn:ietf:params:oauth:grant-type:saml2-bearer',
        assertion: samlToken,
      };

      const requestString = this.generateEncodedFormString(details);

      const url = `${this.customer.apiUrl}oauth/token`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: requestString,
      });
      const result = (await response.json()) as any;

      if (result.errorHttpCode) {
        // this.logger.error(`Error during getToken`, { error: result.errorMessage, details });
        throw new Error(result.errorMessage);
      }
      // await this.cacheService.setItem(cacheKey, result.access_token, ttl);
      return result.access_token;
    }
  }

  getDashboardData(request: IDashboardRequest): IDashboardResponse[] | undefined {
    return undefined;
  } // includes previous months/days, however the filter is set

  getDashboardDetailedData(request: IDashboardRequest): IDashboardResponse[] | undefined {
    return undefined;
  } //includes all jobs in filter range

  getJobData(request: any) {}

  getJobDetailedData(
    request: any, //includes an array of all applications at this job  in filter range
  ) {}

  async getStatusList() {
    const url = `${this.customer.apiUrl}odata/v2/JobApplicationStatusLabel?$format=json`;

    // this.logger.debug('sf getStatusList', url);
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': await this.getAuthHeader(),
        'Content-Type': 'application/json',
      },
    });
    return response;
  }
}
