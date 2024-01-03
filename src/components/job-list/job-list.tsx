import { Component, Host, h, Prop } from '@stencil/core';
import { Job } from '../../../functions/src/models/Job';

@Component({
  tag: 'job-list',
  styleUrl: 'job-list.scss',
  shadow: true,
})
export class JobList {
  @Prop() jobs: Job[] = [];
  @Prop() columnNames: string[] = ['Id', 'Title', 'Ø Time till interview', 'Ø Time till hired', 'Ø Time till rejected'];

  render() {
    if (this.jobs?.length > 0) {
      return (
        <Host>
          <h1 class="title">All jobs</h1>
          <table class="table">
            {this.renderHeader()}
            {this.jobs.map(job => this.renderJobListItem(job))}
          </table>
        </Host>
      );
    } else {
      return (
        <Host>
          <table class="table">
            {this.renderHeader()}
            <h2>No jobs were found</h2>
          </table>
        </Host>
      );
    }
  }

  renderHeader() {
    return (
      <tr class="header">
        {this.columnNames.map(name => {
          return <th class="cell">{name}</th>;
        })}
      </tr>
    );
  }

  renderJobListItem(job: Job) {
    if (!job) return;
    return (
      <tr class="row" onClick={event => this.onJobClicked(event, job)}>
        <td class="cell">{job.jobId}</td>
        <td class="cell">{job.jobTitle}</td>
        <td class="cell">{job.timeStats.timeFromAppliedToInterview}</td>
        <td class="cell">{job.timeStats.timeInterviewToHired}</td>
        <td class="cell">{job.timeStats.timeInterviewToRejected}</td>
      </tr>
    );
  }

  onJobClicked(event: any, job: Job) {
    event.preventDefault();
    event.stopPropagation();
  }
}
