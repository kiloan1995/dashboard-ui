import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'page-job',
  styleUrl: 'page-job.scss',
  shadow: true,
})
export class PageJob {
  render() {
    return (
      <Host>
        <page-header />
        <page-footer class="red" />
      </Host>
    );
  }
}
