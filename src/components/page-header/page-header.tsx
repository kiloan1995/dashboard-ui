import { Component, Host, h, Prop, Listen, State } from '@stencil/core';

@Component({
  tag: 'page-header',
  styleUrl: 'page-header.scss',
  shadow: true,
})
export class PageHeader {
  @Prop() title: string = 'All statuses in the selected timeframe over time';

  @State() scollY: number = 0;

  @Listen('scroll', { target: 'window' })
  onScroll() {
    this.scollY = window.scrollY;
  }

  render() {
    return (
      <Host class={{ 'throw-shadow': this.scollY != 0 }}>
        <div class="bar">
          <h1 class="title">{this.title}</h1>
          <div class="filter-container">
            <div class="filter-name">Interval from...</div>
            <filter-picker />
            <div class="filter-name">until</div>
            <filter-picker />
          </div>
        </div>
      </Host>
    );
  }
}
