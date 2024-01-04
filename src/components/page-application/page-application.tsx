import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'page-application',
  styleUrl: 'page-application.scss',
  shadow: true,
})
export class PageApplication {
  render() {
    return (
      <Host>
        <page-header />
        <page-footer class="red" />
      </Host>
    );
  }
}
