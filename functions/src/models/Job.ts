import { GetApplicationReponse } from './Response/ApplicationsResponse';

export interface Job {
  jobID: string;
  jobTitle: string;
  templateName: string; // use only if data is evaluated in dashboard (eg per manager, employee, apprentice etc.)
  averageTimeSpans: GetApplicationReponse;
  applicationIDs: string[];
  timeSpanPostingDateTillFirstApplicationInMinutes?: number;
  lastClosedApplicationDate?: Date;
}
