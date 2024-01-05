import { Component, Host, h, Prop, State } from '@stencil/core';
import { Application } from '../../../functions/src/models/Application';

import { FunctionLibrary } from '../../global/FunctionLibrary';
import { Job } from '../../../functions/src/models/Job';
import { Breadcrumb } from '../../global/Breadcrumb';
import { UrlHelper } from '../../global/UrlHelper';
import { ApplicationService } from '../../global/ApplicationService';

@Component({
  tag: 'page-job',
  styleUrl: 'page-job.scss',
  shadow: true,
})
export class PageJob {
  @Prop() job: Job;
  @State() applications: Application[];

  @State() breadcrumbs: Breadcrumb[] = [
    { label: 'Dashboard', url: '/' },
    { label: 'Job', url: '/job' },
  ];

  async componentWillLoad() {
    UrlHelper.removeUrlParam('applicationId');
    let params = new URLSearchParams(document.location.search);
    let jobId = params.get('jobId');
    this.breadcrumbs[1].label = 'Job ' + jobId;
    this.applications = await ApplicationService.getApplicationsAtJob('test');
  }

  render() {
    return (
      <Host>
        <page-header breadcrumbs={this.breadcrumbs} />
        <div class="page-container">
          <summary-view color="green" />
          <list-view
            items={this.applications}
            heading={this.applications[0].jobTitle + ' (' + this.applications[0].jobId + ')'}
            fillTablePredicate={this.getApplicationData}
            columnNames={['Id', 'CandiateName', 'Closed Date', 'Has reached final status?', 'Time till interview', 'Time till hired', 'Time till rejected']}
            onItemClicked={event => this.onListItemClicked(event)}
          />
        </div>
        <page-footer class="green" />
      </Host>
    );
  }

  getApplicationData(item: any): string[] {
    let app = item as Application;
    if (app) {
      return [
        app.id,
        app.candidateName,
        FunctionLibrary.dateToStringBeautiful(FunctionLibrary.timestampToDate(app.stats.closedDate)),
        app.stats.hasReachedFinalStatus.toString(),
        app.stats.timeStats.timeFromAppliedToInterview.toString(),
        app.stats.timeStats.timeInterviewToHired.toString(),
        app.stats.timeStats.timeInterviewToRejected.toString(),
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
