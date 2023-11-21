import { ApplicationStats } from './Application';

export interface DashboardRequest {
  from: Date;
  to: Date;
}

export interface DashboardResponse {
  from: Date;
  to: Date;
  average: ApplicationStats;
  averageChangedToNewApplicationInPct: number;
}
