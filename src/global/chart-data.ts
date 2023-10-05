export interface IChartData {
  type: 'column' | 'doughnut' | 'line' | 'splineArea';
  points: IChartDataPoint[];
}
export interface IChartDataPoint {
  label: string;
  y: number;
}
