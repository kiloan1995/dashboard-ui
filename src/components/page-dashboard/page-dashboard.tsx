import { Component, Host, h } from '@stencil/core';
import { Job } from '../../../functions/src/models/Job';
import { ApplicationTimeStat } from '../../../functions/src/models/Stats';

@Component({
  tag: 'page-dashboard',
  styleUrl: 'page-dashboard.scss',
  shadow: true,
})
export class PageDashboard {
  render() {
    let stats: ApplicationTimeStat = { timeFromAppliedToInterview: 10, timeInterviewToHired: 20, timeInterviewToRejected: 30 };
    let job1: Job = {
      jobId: '5157',
      jobTitle: 'tech employee',
      timeStats: stats,
      templateName: '',
      applicationIds: [],
    };
    let job2: Job = {
      jobId: '5154',
      jobTitle: 'store manager employee',
      timeStats: stats,
      templateName: '',
      applicationIds: [],
    };
    let job3: Job = {
      jobId: '5145',
      jobTitle: 'informatiker',
      timeStats: stats,
      templateName: '',
      applicationIds: [],
    };

    let jobs: Job[] = [job1, job2, job3];
    return (
      <Host>
        <page-header />
        <div class="page-container">
          <page-summary />
          <div class="chart-index-container">
            <h1 class="title">All statuses over time</h1>
            <chart-index />
          </div>
          <job-list jobs={jobs} fillTablePredicate={this.getJobData} columnNames={['Id', 'Title', 'Ø Time till interview', 'Ø Time till hired', 'Ø Time till rejected']} />
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
      ];
    }
    return [];
  }
}
