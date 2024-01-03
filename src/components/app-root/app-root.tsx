import { Component, Host, h } from '@stencil/core';
// import { Router } from '@vaadin/router';
import fetch from 'node-fetch';
@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss',
  shadow: true,
})
export class AppRoot {
  // mainRef: HTMLDivElement;

  componentDidLoad() {
    this.test();
    // const router: Router = new Router(this.mainRef);
    // router.setRoutes([{ path: '/', component: 'chart-page' }]);
  }

  render() {
    return (
      <Host>
        {/* <chart-page></chart-page> */}
        <page-dashboard></page-dashboard>
        {/* <div ref={ref => (this.mainRef = ref)}></div> */}
      </Host>
    );
  }

  async test() {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      data: null,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    const url = 'http://127.0.0.1:5001/dashboardui-rs/us-central1/onApplicationUpdated';
    const response = await fetch(url, requestOptions);
    let text = null;
    try {
      text = await response.text(); //unwrap promise
      console.log(text);
    } catch (e) {
      console.log('error', e);
    }
  }
}
