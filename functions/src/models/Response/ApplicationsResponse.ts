import { ApplicationStats, ApplicationStatus } from "../Application";

export interface GetApplicationReponse {
    applicationID: string;
    jobTitle: string;
    candidateName: string;
    stats: ApplicationStats;
    stateList: ApplicationStatus[];
  }