import { Component, Host, h } from '@stencil/core';
@Component({
  tag: 'chart-page',
  styleUrl: 'chart-page.scss',
  shadow: true,
})
export class ChartPage {
  render() {
    return (
      <Host>
        <chart-histogram />
        <chart-pie />
        <chart-index />
      </Host>
    );
  }
}
