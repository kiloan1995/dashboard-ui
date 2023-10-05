import { Component, Host, h } from '@stencil/core';
// import { Router } from '@vaadin/router';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss',
  shadow: true,
})
export class AppRoot {
  // mainRef: HTMLDivElement;

  componentDidLoad() {
    // const router: Router = new Router(this.mainRef);
    // router.setRoutes([{ path: '/', component: 'chart-page' }]);
  }

  render() {
    return (
      <Host>
        <chart-page></chart-page>
        {/* <div ref={ref => (this.mainRef = ref)}></div> */}
      </Host>
    );
  }
}
