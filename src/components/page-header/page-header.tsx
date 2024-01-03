import { Component, Host, h, Listen, State } from '@stencil/core';

@Component({
  tag: 'page-header',
  styleUrl: 'page-header.scss',
  shadow: true,
})
export class PageHeader {
  @State() scollY: number = 0;

  @Listen('scroll', { target: 'window' })
  onScroll() {
    this.scollY = window.scrollY;
  }

  render() {
    return (
      <Host class={{ 'throw-shadow': this.scollY != 0 }}>
        <div class="bar">
          <page-breadcrumbs breadcrumbs={[{ label: 'Dashboard', url: '#' }, { label: 'Job', url: '#' }]}></page-breadcrumbs>
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
