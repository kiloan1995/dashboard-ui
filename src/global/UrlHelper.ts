export class UrlHelper {
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
}
