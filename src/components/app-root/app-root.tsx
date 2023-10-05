import { Component, Element, Host, h } from '@stencil/core';
import { Router } from '@vaadin/router';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss',
  shadow: true,
})
export class AppRoot {
  @Element() el;
  mainRef: HTMLDivElement;

  componentDidLoad() {
    const router: Router = new Router(this.mainRef);
    router.setRoutes([{ path: '/', component: 'chart-page' }]);
  }

  render() {
    return (
      <Host>
        <div ref={ref => (this.mainRef = ref)}></div>
      </Host>
    );
  }
}
