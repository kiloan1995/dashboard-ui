import { Component, Host, h, State, Prop } from '@stencil/core';
import { Breadcrumb } from '../../global/Breadcrumb';
import { Application, ApplicationStats, ApplicationStatus, ApplicationStatusType } from '../../../functions/src/models/Application';
import { ApplicationTimeStat } from '../../../functions/src/models/Stats';

@Component({
  tag: 'page-application',
  styleUrl: 'page-application.scss',
  shadow: true,
})
export class PageApplication {
  @Prop() application: Application;

  @State() breadcrumbs: Breadcrumb[] = [
    { label: 'Dashboard', url: '/' },
    { label: 'Job', url: '/job' },
    { label: 'Application', url: '/job/application' },
  ];

  componentWillLoad() {
    let params = new URLSearchParams(document.location.search);
    let jobId = params.get('jobId');
    let appId = params.get('applicationId');
    this.breadcrumbs[1].label = 'Job ' + jobId;
    this.breadcrumbs[2].label = 'Application ' + appId;

    let timeStats: ApplicationTimeStat = { timeFromAppliedToInterview: 10, timeInterviewToHired: 20, timeInterviewToRejected: 30 };
    let stats: ApplicationStats = { timeStats: timeStats, hasReachedFinalStatus: false, closedDate: new Date() };

    let status1: ApplicationStatus = { date: new Date(), status: ApplicationStatusType.STATUS_REJECTED, statusNameInSF: '' };
    let status: ApplicationStatus[] = [status1, status1];

    this.application = { candidateName: 'kilian gfl', id: '16843', jobId: '68765', jobTitle: 'test title', stats: stats, statusArr: status };
  }

  render() {
    return (
      <Host>
        <page-header breadcrumbs={this.breadcrumbs} />
        <div class="page-container">
          <div class="chart-pie-container">
            <chart-pie />
          </div>
        </div>
        <page-footer class="red" />
      </Host>
    );
  }
}
