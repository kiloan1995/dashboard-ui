import { ApplicationStatus, ApplicationStatusType, ApplicationStats } from './Application';
import { ApplicationTimeStat } from './Stats';

export class StatMgr {
  static calculateAppStats(statuses: ApplicationStatus[]): ApplicationStats {
    let timeStat: ApplicationTimeStat = {
      timeFromAppliedToInterview: this.calculateTimeTill(statuses, [ApplicationStatusType.STATUS_INTERVIEW]),
      timeInterviewToHired: this.calculateTimeTill(statuses, [ApplicationStatusType.STATUS_HIRED]),
      timeInterviewToRejected: this.calculateTimeTill(statuses, [ApplicationStatusType.STATUS_REJECTED, ApplicationStatusType.STATUS_WITHDRAWN]),
    };
    return {
      timeStats: timeStat,
      hasReachedFinalStatus: StatMgr.containsAnyFinalStatus(statuses),
      closedDate: StatMgr.getClosedDate(statuses),
    };
  }
  /**@Input targetState - if one of the states is met in this array.
   * @Return time in Minutes */
  static calculateTimeTill(statuses: ApplicationStatus[], targetState: ApplicationStatusType[]): number {
    let startDate: Date | null = null;
    let endDate: Date | null = null;
    for (let status of statuses) {
      if (status.status == ApplicationStatusType.STATUS_APPLIED) startDate = status.date;
      if (targetState.includes(status.status)) endDate = status.date;
    }
    if (startDate && endDate) {
      return (endDate.getTime() - startDate.getTime()) / 1000 / 60; // milliseonds to minutes
    }
    return -1;
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

  static calcAverage(old: ApplicationTimeStat, toAdd: ApplicationTimeStat): ApplicationTimeStat {
    if (old.timeFromAppliedToInterview == -1) {
      old.timeFromAppliedToInterview = toAdd.timeFromAppliedToInterview;
    } else {
      old.timeFromAppliedToInterview += toAdd.timeFromAppliedToInterview;
      old.timeFromAppliedToInterview /= 2;
    }

    if (old.timeInterviewToHired == -1) {
      old.timeInterviewToHired = toAdd.timeInterviewToHired;
    } else {
      old.timeInterviewToHired += toAdd.timeInterviewToHired;
      old.timeInterviewToHired /= 2;
    }

    if (old.timeInterviewToRejected == -1) {
      old.timeInterviewToRejected = toAdd.timeInterviewToRejected;
    } else {
      old.timeInterviewToRejected += toAdd.timeInterviewToRejected;
      old.timeInterviewToRejected /= 2;
    }
    return old;
  }
}
