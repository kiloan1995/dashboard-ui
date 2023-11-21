import { ApplicationStatus, ApplicationStatusType, ApplicationStats } from './Application';

export class StatMgr {
  static calculateAppStats(states: ApplicationStatus[]): ApplicationStats {
    return {
      timeFromAppliedToInterview: StatMgr.calculateTimeTill(states, ApplicationStatusType.STATUS_INTERVIEW),
      timeInterviewToHired: StatMgr.calculateTimeTill(states, ApplicationStatusType.STATUS_HIRED),
      timeInterviewToRejected: StatMgr.calculateTimeTill(states, ApplicationStatusType.STATUS_REJECTED || StatMgr.calculateTimeTill(states, ApplicationStatusType.STATUS_WITHDRAWN)),
      hasReachedFinalStatus: StatMgr.containsAnyFinalState(states),
      closedDate: StatMgr.getClosedDate(states),
    };
  }
  /**Returns time in Minutes */
  static calculateTimeTill(states: ApplicationStatus[], targetState: ApplicationStatusType): number | undefined {
    let startDate: Date | null = null;
    let endDate: Date | null = null;
    for (let state of states) {
      if (state.status == ApplicationStatusType.STATUS_INTERVIEW) startDate = state.date;
      if (state.status == targetState) endDate = state.date;
    }
    if (startDate && endDate) {
      return endDate.getTime() - startDate.getTime() * 1000 * 60; // milliseonds to minutes
    }
    return undefined;
  }

  static getClosedDate(states: ApplicationStatus[]): Date | undefined {
    for (let state of states) {
      if (ApplicationStatusType.isFinalStatus(state.status)) return state.date;
    }
    return undefined;
  }

  static containsAnyFinalState(states: ApplicationStatus[]): boolean {
    if (!states) return false;
    for (let state of states) {
      if (ApplicationStatusType.isFinalStatus(state.status)) return true;
    }
    return false;
  }
}
