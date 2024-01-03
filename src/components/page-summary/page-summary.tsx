import { Component, Host, h } from '@stencil/core';
@Component({
  tag: 'page-summary',
  styleUrl: 'page-summary.scss',
  shadow: true,
})
export class PageSummary {
  render() {
    return (
      <Host>
        <h1 class="title">Application Process Performance</h1>
        <div class="preview-grid">
          <preview-tile title="10 days" small="Time to interview" bIsAverage={true} />
          <preview-tile title="15 days" small="Time to interview" bIsAverage={true} />
          <preview-tile title="20 days" small="Time to rejected" bIsAverage={true} />
          <preview-tile title="20 days" small="Time to final" bIsAverage={true} />
          <preview-tile title="800" small="Statuschanges" bIsAverage={false} />
          <preview-tile title="18" small="New vs. changed" bIsAverage={false} />
        </div>
      </Host>
    );
  }
}
