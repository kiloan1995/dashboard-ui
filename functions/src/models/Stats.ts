export interface StatDay {
  newApplicationIDCount: number;
  changedApplicationIDCount: number;
  closedApplicationIDCount: number;
}

export interface ApplicationTimeStat {
  /**In Minutes*/
  timeFromAppliedToInterview?: number;
  /**In Minutes*/
  timeInterviewToHired?: number;
  /**In Minutes*/
  timeInterviewToRejected?: number;
}
