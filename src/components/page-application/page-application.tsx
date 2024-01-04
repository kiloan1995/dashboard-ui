import { Component, Host, h, State } from '@stencil/core';
import { Breadcrumb } from '../../global/Breadcrumb';

@Component({
  tag: 'page-application',
  styleUrl: 'page-application.scss',
  shadow: true,
})
export class PageApplication {
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
  }
  render() {
    return (
      <Host>
        <page-header breadcrumbs={this.breadcrumbs} />
        <page-footer class="red" />
      </Host>
    );
  }
}
