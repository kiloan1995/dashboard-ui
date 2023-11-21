export interface Application {
  ID: string;
  jobID: string;
  jobTitle: string;
  candidateName: string;
  timeSpans: GetApplicationReponse;
  states: ApplicationState[];
}

export enum ApplicationStateType {
  STATE_APPLIED,
  STATE_FORWARDED,
  STATE_INTERVIEW,
  STATE_HIRED,
  STATE_REJECTED,
  STATE_WITHDRAWN,
}

export namespace ApplicationStateType {
  export function isFinalState(state: ApplicationStateType) {
    return state >= ApplicationStateType.STATE_HIRED;
  }
}

export interface ApplicationState {
  stateNameInSF: string;
  state: ApplicationStateType;
  date: Date;
}

export interface GetApplicationRequest {
  applicationID: string;
}

export interface GetApplicationReponse {
  applicationID: string;
  jobTitle: string;
  candidateName: string;
  stateList: ApplicationState[];
  stats: ApplicationStats;
}

export interface ApplicationStats {
  /**In Minutes*/
  timeFromAppliedToInterview?: number;
  /**In Minutes*/
  timeInterviewToHired?: number;
  /**In Minutes*/
  timeInterviewToRejected?: number;
  hasReachedFinalState: boolean;
  closedDate?: Date;
}
