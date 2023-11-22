import { ApplicationTimeStat } from './Stats';

export interface Job {
  jobId: string;
  jobTitle: string;
  templateName: string; // use only if data is evaluated in dashboard (eg per manager, employee, apprentice etc.)
  applicationIds: string[];
  /**In Minutes */
  timePostingDateTillFirstApplication?: number;
  timeStats: ApplicationTimeStat;
  lastClosedApplicationDate?: Date;
}
