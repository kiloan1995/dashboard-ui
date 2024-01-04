import { Component, Host, h, Listen, State, Prop } from '@stencil/core';
import { Breadcrumb } from '../../global/Breadcrumb';

@Component({
  tag: 'page-header',
  styleUrl: 'page-header.scss',
  shadow: true,
})
export class PageHeader {
  @Prop() breadcrumbs: Breadcrumb[] = [];

  @State() scollY: number = 0;

  @Listen('scroll', { target: 'window' })
  onScroll() {
    this.scollY = window.scrollY;
  }

  render() {
    return (
      <Host class={{ 'throw-shadow': this.scollY != 0 }}>
        <div class="bar">
          <page-breadcrumbs breadcrumbs={this.breadcrumbs}></page-breadcrumbs>
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
