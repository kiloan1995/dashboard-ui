import { DateHelper } from '../../functions/src/models/DateHelper';
export class FunctionLibrary {
  static dateToStringBeautiful(date: Date, separator: string = '.'): string {
    console.log(date);
    if (!date) return 'error date';
    return this.addLeadingZeroes(date.getUTCDate(), 2) + separator + this.addLeadingZeroes(date.getUTCMonth() + 1, 2) + separator + date.getUTCFullYear();
  }

  static addLeadingZeroes(num: number, numberOfDigits: number): string {
    let result: string = num.toString();
    while (result.length < numberOfDigits) {
      result = '0' + result;
    }
    return result;
  }

  static customDateToDate(date: string): Date {
    let s: string[] = date.split('-');

    return new Date(parseInt(s[2]), parseInt(s[1]) - 1, parseInt(s[0]));
  }

  static timestampToDate(date: Date): Date {
    return DateHelper.timestampToDate(date);
  }

  static htmlInputDateToCustomDate(date: string): string {
    // yyyy-mm-dd
    let s: string[] = date.split('-');
    // dd-mm-yyyy
    return s[2] + '-' + s[1] + '-' + s[0];
  }
}
