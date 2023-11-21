export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  candidateName: string;
  stats: ApplicationStats;
  statusArr: ApplicationStatus[];
}

export enum ApplicationStatusType {
  STATUS_APPLIED,
  STATUS_FORWARDED,
  STATUS_INTERVIEW,
  STATUS_HIRED,
  STATUS_REJECTED,
  STATUS_WITHDRAWN,
}

export namespace ApplicationStatusType {
  export function isFinalStatus(status: ApplicationStatusType) {
    return status >= ApplicationStatusType.STATUS_HIRED;
  }
}

export interface ApplicationStatus {
  statusNameInSF: string;
  status: ApplicationStatusType;
  date: Date;
}

export interface ApplicationStats {
  /**In Minutes*/
  timeFromAppliedToInterview?: number;
  /**In Minutes*/
  timeInterviewToHired?: number;
  /**In Minutes*/
  timeInterviewToRejected?: number;
  hasReachedFinalStatus: boolean;
  closedDate?: Date;
}
