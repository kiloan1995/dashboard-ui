import { format } from 'date-fns';

export class DateHelper {
  static sfStringToDate(dateString: string): Date {
    if (dateString) {
      const result = dateString.replace('/Date(', '').replace(')/', '');
      if (result) {
        const re = /-?\d+/;
        const m = re.exec(result);
        if (m) {
          const number = parseInt(m[0], 10);
          const newDate = format(number, 'yyyy-MM-dd');
          return new Date(newDate);
        }
      }
    }
    return new Date();
  }
}
