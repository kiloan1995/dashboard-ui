import { ApplicationStats } from '../Application';
import { GetApplicationReponse } from './ApplicationsResponse';

export interface GetJobResponse {
  jobTitle: string;
  applications: GetApplicationReponse[];
  aggregated: ApplicationStats;
}
