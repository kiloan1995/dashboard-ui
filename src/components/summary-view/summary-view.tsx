import { Component, Host, h, Prop } from '@stencil/core';
@Component({
  tag: 'summary-view',
  styleUrl: 'summary-view.scss',
  shadow: true,
})
export class SummaryView {
  @Prop() color: string = '';

  render() {
    return (
      <Host>
        <h1 class="title">Application Process Performance</h1>
        <div class="preview-grid">
          <preview-tile class={{ [this.color]: true }} title="10 days" small="Time to interview" bIsAverage={true} />
          <preview-tile class={{ [this.color]: true }} title="15 days" small="Time to hired" bIsAverage={true} />
          <preview-tile class={{ [this.color]: true }} title="20 days" small="Time to rejected" bIsAverage={true} />
          <preview-tile class={{ [this.color]: true }} title="20 days" small="Time to final" bIsAverage={true} />
          <preview-tile class={{ [this.color]: true }} title="800" small="Statuschanges" bIsAverage={false} />
          <preview-tile class={{ [this.color]: true }} title="18" small="New vs. changed" bIsAverage={false} />
        </div>
      </Host>
    );
  }
}
