import { Component, Host, h, Listen, State, Prop, Event, EventEmitter } from '@stencil/core';
import { Breadcrumb } from '../../global/Breadcrumb';

@Component({
  tag: 'page-header',
  styleUrl: 'page-header.scss',
  shadow: true,
})
export class PageHeader {
  @Prop() breadcrumbs: Breadcrumb[] = [];
  @Event() startDateChanged: EventEmitter<Date>;
  @Event() endDateChanged: EventEmitter<Date>;

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
            <filter-picker urlParamName="startDate" onDateChanged={event => this.onStartDateChange(event)} />
            <div class="filter-name">until</div>
            <filter-picker urlParamName="endDate" onDateChanged={event => this.onEndDateChange(event)} />
          </div>
        </div>
      </Host>
    );
  }

  onStartDateChange(event: any) {
    event.stopPropagation();
    event.preventDefault();
    this.startDateChanged.emit(event.details);
  }

  onEndDateChange(event: any) {
    event.stopPropagation();
    event.preventDefault();
    this.endDateChanged.emit(event.details);
  }
}
