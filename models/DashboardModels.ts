import { IGetApplicationDataAggregatedReponse } from "./RequestObject";

export interface IDashboardRequest{
    from:Date;
    to:Date;
}

export interface IDashboardResponse{
    from:Date;
    to:Date;
    average: IGetApplicationDataAggregatedReponse;
    averageChangedToNewApplicationInPct: number;
}