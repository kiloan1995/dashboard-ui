import { Component, Host, h, State } from '@stencil/core';
import { Breadcrumb } from '../../global/Breadcrumb';
import { Application } from '../../../functions/src/models/Application';
import { ApplicationService } from '../../global/ApplicationService';

@Component({
  tag: 'page-application',
  styleUrl: 'page-application.scss',
  shadow: true,
})
export class PageApplication {
  @State() application: Application = null;

  @State() breadcrumbs: Breadcrumb[] = [
    { label: 'Dashboard', url: '/' },
    { label: 'Job', url: '/job' },
    { label: 'Application', url: '/job/application' },
  ];

  async componentWillLoad() {
    let params = new URLSearchParams(document.location.search);
    let jobId = params.get('jobId');
    let appId = params.get('applicationId');
    this.breadcrumbs[1].label = 'Job ' + jobId;
    this.breadcrumbs[2].label = 'Application ' + appId;

    this.application = await ApplicationService.getApplication('No working yet');
  }

  render() {
    return (
      <Host>
        <page-header breadcrumbs={this.breadcrumbs} />
        <div class="page-container">
          <div class="status-container">
            <h1 class="title">{this.application?.candidateName}</h1>
            <chart-index />
          </div>
          <div class="status-container">
            <h1 class="title">All status on {this.application?.jobTitle}</h1>
            <status-preview status={this.application?.statusArr} />
          </div>
          <div class="chart-pie-container">
            <h1 class="title">Durations in the process</h1>
            <chart-pie />
          </div>
        </div>
        <page-footer class="red" />
      </Host>
    );
  }
}
