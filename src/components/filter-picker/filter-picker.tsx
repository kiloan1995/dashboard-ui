import { Component, Host, h } from '@stencil/core';
import { FunctionLibrary } from '../../global/FunctionLibrary';

@Component({
  tag: 'filter-picker',
  styleUrl: 'filter-picker.scss',
  shadow: true,
})
export class FilterPicker {
  render() {
    const date = new Date();
    let maxDate: string = date.getFullYear() + '-' + FunctionLibrary.addLeadingZeroes(date.getUTCMonth() + 1, 2) + '-' + FunctionLibrary.addLeadingZeroes(date.getDay(), 2);
    let minDate: string = date.getFullYear() - 4 + '-' + FunctionLibrary.addLeadingZeroes(date.getUTCMonth() + 1, 2) + '-' + FunctionLibrary.addLeadingZeroes(date.getDay(), 2);
    return (
      <Host>
        <input type="date" id="start" value={maxDate} min={minDate} max={maxDate} />
      </Host>
    );
  }
}
