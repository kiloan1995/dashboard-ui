export class FunctionLibrary {
  static dateToStringBeautiful(date: Date): string {
    return this.addLeadingZeroes(date.getUTCDay(), 2) + '.' + this.addLeadingZeroes(date.getUTCMonth() + 1, 2) + '.' + date.getFullYear();
  }

  static addLeadingZeroes(num: number, numberOfDigits: number): string {
    let result: string = num.toString();
    while (result.length < numberOfDigits) {
      result = '0' + result;
    }
    return result;
  }
}
