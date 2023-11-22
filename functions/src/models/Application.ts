import { ApplicationTimeStat } from './Stats';

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  candidateName: string;
  stats: ApplicationStats;
  statusArr: ApplicationStatus[];
}

export namespace Application {
  export function findClosedDate(app: Application): Date | undefined {
    for (let status of app.statusArr) {
      if (ApplicationStatusType.isFinalStatus(status.status)) return status.date;
    }
    return undefined;
  }
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
  timeStats: ApplicationTimeStat;
  hasReachedFinalStatus: boolean;
  closedDate?: Date;
}
