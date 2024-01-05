import { Application, ApplicationStatusType } from '../../functions/src/models/Application';

export class StatService {
  static getNumStatusChanges(apps: Application[]): number {
    let changes: number = 0;
    if (apps?.length > 0) {
      for (const app of apps) {
        changes += app.statusArr.length - 1; // we want changes, not amount of status
      }
    }
    return changes;
  }

  static getAvgTimeToStatus(apps: Application[], status: ApplicationStatusType): Date {
    let time: number = 0;
    let isFirst = true;
    if (apps?.length > 0) {
      for (const app of apps) {
        switch (status) {
          case ApplicationStatusType.STATUS_HIRED:
            if (app.stats.timeStats.timeInterviewToHired) {
              time += app.stats.timeStats.timeInterviewToHired;
              isFirst ? (isFirst = false) : time / 2;
            }
            break;
          case ApplicationStatusType.STATUS_INTERVIEW:
            if (app.stats.timeStats.timeFromAppliedToInterview) {
              time += app.stats.timeStats.timeFromAppliedToInterview;
              isFirst ? (isFirst = false) : time / 2;
            }
            break;
          case ApplicationStatusType.STATUS_REJECTED:
            if (app.stats.timeStats.timeInterviewToRejected) {
              time += app.stats.timeStats.timeInterviewToRejected;
              isFirst ? (isFirst = false) : time / 2;
            }
            break;
        }
      }
    }
    return new Date(time * 1000);
  }
}
