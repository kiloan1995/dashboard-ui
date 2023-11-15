export interface IDataSetItemDate {
  date: Date;
  value: number;
}

export interface IDataSetDate {
  name: string;
  data: IDataSetItemDate[];
}
