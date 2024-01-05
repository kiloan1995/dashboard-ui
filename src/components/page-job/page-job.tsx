import { Component, Host, h, Prop, State } from '@stencil/core';
import { Application, ApplicationStats, ApplicationStatus, ApplicationStatusType } from '../../../functions/src/models/Application';
import { ApplicationTimeStat } from '../../../functions/src/models/Stats';
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

  @State() breadcrumbs: Breadcrumb[] = [
    { label: 'Dashboard', url: '/' },
    { label: 'Job', url: '/job' },
  ];

  componentWillLoad() {
    UrlHelper.removeUrlParam('applicationId');
    let params = new URLSearchParams(document.location.search);
    let jobId = params.get('jobId');
    this.breadcrumbs[1].label = 'Job ' + jobId;
    ApplicationService.getApplicationsAtJob('test');
  }

  render() {
    let timeStats: ApplicationTimeStat = { timeFromAppliedToInterview: 10, timeInterviewToHired: 20, timeInterviewToRejected: 30 };
    let stats: ApplicationStats = { timeStats: timeStats, hasReachedFinalStatus: false, closedDate: new Date() };

    let status1: ApplicationStatus = { date: new Date(), status: ApplicationStatusType.STATUS_REJECTED, statusNameInSF: '' };
    let status: ApplicationStatus[] = [status1, status1];

    let app1: Application = { candidateName: 'kilian gfl', id: '16843', jobId: '68765', jobTitle: 'test title', stats: stats, statusArr: status };
    let apps: Application[] = [app1, app1];

    return (
      <Host>
        <page-header breadcrumbs={this.breadcrumbs} />
        <div class="page-container">
          <summary-view color="green" />
          <list-view
            items={apps}
            fillTablePredicate={this.getApplicationData}
            columnNames={['Id', 'CandiateName', 'Job ID', 'Job Title', 'Closed Date', 'Has reached final status?', 'Time till interview', 'Time till hired', 'Time till rejected']}
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
        app.jobId,
        app.jobTitle,
        FunctionLibrary.dateToStringBeautiful(app.stats.closedDate),
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
