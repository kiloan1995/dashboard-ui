import { ApplicationStatus, ApplicationStatusType, ApplicationStats } from './Application';

export class StatMgr {
  static calculateAppStats(statuses: ApplicationStatus[]): ApplicationStats {
    return {
      timeFromAppliedToInterview: StatMgr.calculateTimeTill(statuses, ApplicationStatusType.STATUS_INTERVIEW),
      timeInterviewToHired: StatMgr.calculateTimeTill(statuses, ApplicationStatusType.STATUS_HIRED),
      timeInterviewToRejected: StatMgr.calculateTimeTill(
        statuses,
        ApplicationStatusType.STATUS_REJECTED || StatMgr.calculateTimeTill(statuses, ApplicationStatusType.STATUS_WITHDRAWN),
      ),
      hasReachedFinalStatus: StatMgr.containsAnyFinalStatus(statuses),
      closedDate: StatMgr.getClosedDate(statuses),
    };
  }
  /**Returns time in Minutes */
  static calculateTimeTill(statuses: ApplicationStatus[], targetState: ApplicationStatusType): number | undefined {
    let startDate: Date | null = null;
    let endDate: Date | null = null;
    for (let status of statuses) {
      if (status.status == ApplicationStatusType.STATUS_APPLIED) startDate = status.date;
      if (status.status == targetState) endDate = status.date;
    }
    if (startDate && endDate) {
      return (endDate.getTime() - startDate.getTime()) / 1000 / 60; // milliseonds to minutes
    }
    return undefined;
  }

  static getClosedDate(statuses: ApplicationStatus[]): Date | undefined {
    for (let state of statuses) {
      if (ApplicationStatusType.isFinalStatus(state.status)) return state.date;
    }
    return undefined;
  }

  static containsAnyFinalStatus(statuses: ApplicationStatus[]): boolean {
    if (!statuses) return false;
    for (let status of statuses) {
      if (ApplicationStatusType.isFinalStatus(status.status)) return true;
    }
    return false;
  }
}
