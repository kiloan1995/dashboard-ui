import { Component, Host, h, Prop } from '@stencil/core';
import { ApplicationStatus, ApplicationStatusType } from '../../../functions/src/models/Application';
import { FunctionLibrary } from '../../global/FunctionLibrary';

@Component({
  tag: 'status-preview',
  styleUrl: 'status-preview.scss',
  shadow: true,
})
export class StatusPreview {
  @Prop() status: ApplicationStatus[];

  render() {
    return (
      <Host>
        <table class="table">
          <tr class="header">
            <th class="cell">Status</th>
            <th class="cell">Status name in SuccessFactors</th>
            <th class="cell">Date</th>
          </tr>
          {this.status?.map(status => {
            return (
              <tr class="row">
                {/* Get Enum string by using the index for the enum as array. whoy knew...  */}
                <td class="cell">{ApplicationStatusType[status.status]}</td>
                <td class="cell">{status.statusNameInSF}</td>
                <td class="cell">{FunctionLibrary.dateToStringBeautiful(status.date)}</td>
              </tr>
            );
          })}
        </table>
      </Host>
    );
  }
}
