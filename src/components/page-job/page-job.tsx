import { Component, Host, h, State } from '@stencil/core';
import { Application } from '../../../functions/src/models/Application';
import { FunctionLibrary } from '../../global/FunctionLibrary';
import { Breadcrumb } from '../../global/Breadcrumb';
import { UrlHelper } from '../../global/UrlHelper';
import { ApplicationService } from '../../global/ApplicationService';

@Component({
  tag: 'page-job',
  styleUrl: 'page-job.scss',
  shadow: true,
})
export class PageJob {
  @State() applications: Application[];

  @State() breadcrumbs: Breadcrumb[] = [
    { label: 'Dashboard', url: '/' },
    { label: 'Job', url: '/job' },
  ];

  refStartDate: HTMLFilterPickerElement;
  refEndDate: HTMLFilterPickerElement;

  async componentWillLoad() {
    UrlHelper.removeUrlParam('applicationId');
    this.breadcrumbs[1].label = 'Job ' + UrlHelper.getUrlParam('jobId');
    this.kickOffSearch(null);
  }

  render() {
    return (
      <Host>
        <page-header breadcrumbs={this.breadcrumbs} onStartDateChanged={event => this.kickOffSearch(event)} onEndDateChanged={event => this.kickOffSearch(event)} />
        <div class="page-container">
          <summary-view color="green" />
          <list-view
            items={this.applications?.sort((a, b) => {
              return parseInt(a.id) < parseInt(b.id) ? -1 : 1;
            })}
            heading={this.applications?.[0]?.jobTitle + ' (jobID= ' + this.applications?.[0]?.jobId + ')'}
            fillTablePredicate={this.getApplicationData}
            columnNames={['Id', 'Candidate Name', 'Time till interview', 'Time till hired', 'Time till rejected', 'Has reached final status?', 'Statuscount', 'Closed Date']}
            onItemClicked={event => this.onListItemClicked(event)}
          />
        </div>
        <page-footer class="green" />
      </Host>
    );
  }

  async kickOffSearch(event: any) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    let startDate: Date = FunctionLibrary.customDateToDate(UrlHelper.getUrlParam('startDate'));
    let endDate: Date = FunctionLibrary.customDateToDate(UrlHelper.getUrlParam('endDate'));
    console.log('check dates', startDate, endDate);
    this.applications = await ApplicationService.getApplicationsAtJob(UrlHelper.getUrlParam('jobId'), startDate, endDate);
  }

  getApplicationData(item: any): string[] {
    let app = item as Application;
    if (app) {
      return [
        app.id,
        app.candidateName,
        app.stats.timeStats.timeFromAppliedToInterview.toString(),
        app.stats.timeStats.timeInterviewToHired.toString(),
        app.stats.timeStats.timeInterviewToRejected.toString(),
        app.stats.hasReachedFinalStatus.toString(),
        app.statusArr.length.toString(),
        FunctionLibrary.dateToStringBeautiful(FunctionLibrary.timestampToDate(app.stats.closedDate)),
      ];
    }
    return [];
  }

  onListItemClicked(event: any) {
    event.preventDefault();
    event.stopPropagation();
    let app: Application = event.detail as Application;
    if (app) {
      UrlHelper.setUrlParam('applicationId', app.id);
      UrlHelper.navigateTo('/job/application');
    }
  }
}
