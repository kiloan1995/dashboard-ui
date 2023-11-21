import { GetApplicationReponse, ApplicationStats } from './Application';

export interface Job {
  jobID: string;
  jobTitle: string;
  templateName: string; // use only if data is evaluated in dashboard (eg per manager, employee, apprentice etc.)
  averageTimeSpans: GetApplicationReponse;
  applicationIDs: string[];
  timeSpanPostingDateTillFirstApplicationInMinutes?: number;
  lastClosedApplicationDate?: Date;
}

export interface GetJobRequest {
  jobID: string;
}

export interface GetJobResponse {
  jobTitle: string;
  applications: GetApplicationReponse[];
  aggregated: ApplicationStats;
}
