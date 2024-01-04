export class FunctionLibrary {
  static dateToStringBeautiful(date: Date, separator: string = '.'): string {
    return this.addLeadingZeroes(date.getUTCDay(), 2) + separator + this.addLeadingZeroes(date.getUTCMonth() + 1, 2) + separator + date.getFullYear();
  }

  static addLeadingZeroes(num: number, numberOfDigits: number): string {
    let result: string = num.toString();
    while (result.length < numberOfDigits) {
      result = '0' + result;
    }
    return result;
  }

  static setUrlParam(name: string, value: string) {
    let url = new URL(window.location.href);
    if (url.searchParams.has(name)) {
      url.searchParams.set(name, value);
    } else {
      url.searchParams.append(name, value);
    }
    console.log('new url= ', url);

    window.history.pushState({ path: url.toString() }, '', url);
  }
  static navigateTo(path: string) {
    let url = new URL(window.location.href);
    url.pathname = path;
    window.location.href = url.toString();
  }

  static getUrlParam(name: string): string {
    let params = new URLSearchParams(document.location.search);
    return params.get(name);
  }
  static removeUrlParam(name: string): void {
    let url = new URL(window.location.href);
    if (url.searchParams.has(name)) {
      url.searchParams.delete(name);
    }
    window.history.pushState({ path: url.toString() }, '', url);
  }

  static htmlInputDateToCustomDate(date: string): string {
    let s: string[] = date.split('-');
    return s[1] + '-' + s[2] + '-' + s[0];
  }
}
