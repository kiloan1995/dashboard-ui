import { Component, Host, h, Prop } from '@stencil/core';
import { Job } from '../../../functions/src/models/Job';
import { Breadcrumb } from '../../global/Breadcrumb';
import { UrlHelper } from '../../global/UrlHelper';
import { JobService } from '../../global/JobService';

@Component({
  tag: 'page-dashboard',
  styleUrl: 'page-dashboard.scss',
  shadow: true,
})
export class PageDashboard {
  @Prop() jobs: Job[] = [];

  async componentWillLoad() {
    UrlHelper.removeUrlParam('applicationId');
    UrlHelper.removeUrlParam('jobId');

    this.jobs = await JobService.getJobs(null, null);
  }

  render() {
    let breadcrumbs: Breadcrumb[] = [{ label: 'Dashboard', url: '/' }];
    return (
      <Host>
        <page-header breadcrumbs={breadcrumbs} />
        <div class="page-container">
          <summary-view />
          <div class="chart-index-container">
            <h1 class="title">All statuses over time</h1>
            <chart-index />
          </div>
          <list-view
            items={this.jobs}
            fillTablePredicate={this.getJobData}
            columnNames={['Id', 'Title', 'Ø Time till interview', 'Ø Time till hired', 'Ø Time till rejected', 'Applicationcount']}
            onItemClicked={event => this.onListItemClicked(event)}
          />
        </div>
        <page-footer />
      </Host>
    );
  }

  getJobData(item: any): string[] {
    let job = item as Job;
    if (job) {
      return [
        job.jobId,
        job.jobTitle,
        job.timeStats.timeFromAppliedToInterview.toString(),
        job.timeStats.timeInterviewToHired.toString(),
        job.timeStats.timeInterviewToRejected.toString(),
        job.applicationIds.length.toString(),
      ];
    }
    return [];
  }

  onListItemClicked(event: any) {
    event.preventDefault();
    event.stopPropagation();
    let job: Job = event.detail as Job;

    if (job) {
      UrlHelper.setUrlParam('jobId', job.jobId);
      UrlHelper.navigateTo('/job');
    }
  }
}
