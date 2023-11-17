export interface IGetApplicationDataRequest
{
    applicationID: string;
}

export enum EApplicationStatus{
    STATE_APPLIED,
    STATE_FORWARDED,
    STATE_HIRED,
    STATE_REJECTED,
    STATE_WITHDRAWN
}

export interface IApplicationState{
    stateNameInSF:string;
    state: EApplicationStatus;
    date: Date;
}

export interface IGetApplicationDataReponse
{
    applicationID: string;
    jobTitle:string;
    candidateName:string;
    stateList: IApplicationState[];    
    aggregated: IGetApplicationDataAggregatedReponse;
}

export interface IGetApplicationDataAggregatedReponse
{
    timeFromAppliedToInterviewInMinutes?:number,
    timeInterviewToHiredInMinutes?:number,
    timeInterviewToRejectedInMinutes?:number,
    hasReachedFinalState:boolean,
    closedDate?:Date;
}

export interface IGetJobDataRequest
{
    jobID: string;
}

export interface IGetJobDataResponse
{
    jobTitle: string;
    applications: IGetApplicationDataReponse[];
    aggregated: IGetApplicationDataAggregatedReponse;
}