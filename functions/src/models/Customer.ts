import { ApplicationStatus } from './Application';

export interface Customer {
  id: string;
  apiKey: string;
  clientID: string;
  apiUrl: SVGStringList;
  companyID: string;
  userID: string;
  stateMapping: { key: string; value: ApplicationStatus };
}
