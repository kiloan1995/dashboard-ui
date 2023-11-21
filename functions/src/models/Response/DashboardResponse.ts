import { ApplicationStats } from "../Application";

export interface DashboardResponse {
    from: Date;
    to: Date;
    average: ApplicationStats;
    averageChangedToNewApplicationInPct: number;
  }