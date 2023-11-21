
export class DatabaseWorker {
  //updates data either on callback or regularly
  pullDataFromSFandPushToDatabase() {}

  acquireStateMapping() {}

  postDataUpdateDoAverageUpdate() {}

  checkWhatToUpdate() {}
}

export class DailyWorker {
  aggregateStats() {}
}

/*
1. erstmal eine dummy datenbank in code bauen mit applications und job
2. dummydatenschnittstelle bauen
3. schauen was größere hürde ist, daten aus SF bekommen oder frontend bauen.
Media Markt hat uns bereits auf PROD die Rechte gegeben.
*/
