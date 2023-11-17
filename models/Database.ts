import { IApplicationState, IGetApplicationDataReponse } from "./RequestObject";

export interface IDatabaseApplicationStruct{
    ID:string;
    jobID: string;
    jobTitle:string;
    candidateName:string;
    timeSpans :IGetApplicationDataReponse;
    states: IApplicationState[]; 
}

export interface IDatabaseJobStruct{
    jobID:string;
    jobTitle:string;
    templateName:string; // use only if data is evaluated in dashboard (eg per manager, employee, apprentice etc.) 
    averageTimeSpans: IGetApplicationDataReponse;
    applicationIDs: string[];
    timeSpanPostingDateTillFirstApplicationInMinutes?:number;
    lastClosedApplicationDate?:Date;
}

export interface ICustomer{
    APIKey:string;
    clientID:string;
    APIUrl:SVGStringList;
    companyID:string;
    userID:string;
    stateMapping:{key:string, value:IApplicationState};
}

export interface IAverageDayStruct{
    newApplicationIDCount:number;
    changedApplicationIDCount:number;
    closedApplicationIDCount:number;
}

export class DatabaseWorker{
    //updates data either on callback or regularly
    pullDataFromSFandPushToDatabase(){

    }

    acquireStateMapping()
    {

    }

    postDataUpdateDoAverageUpdate()
    {

    }

    checkWhatToUpdate(){

    }
}


export class DailyWorker
{
    aggregateStats(){
        
    }
}

/*
1. erstmal eine dummy datenbank in code bauen mit applications und job
2. dummydatenschnittstelle bauen
3. schauen was größere hürde ist, daten aus SF bekommen oder frontend bauen.
Media Markt hat uns bereits auf PROD die Rechte gegeben.
*/ 