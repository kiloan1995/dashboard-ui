import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'filter-picker',
  styleUrl: 'filter-picker.scss',
  shadow: true,
})
export class FilterPicker {
  render() {
    const date = new Date();
    let maxDate: string = date.getFullYear() + '-' + addLeadingZeroes(date.getUTCMonth() + 1, 2) + '-' + addLeadingZeroes(date.getDay(), 2);
    let minDate: string = date.getFullYear() - 4 + '-' + addLeadingZeroes(date.getUTCMonth() + 1, 2) + '-' + addLeadingZeroes(date.getDay(), 2);
    return (
      <Host>
        <input type="date" id="start" value={maxDate} min={minDate} max={maxDate} />
      </Host>
    );
  }
}
function addLeadingZeroes(num: number, numberOfDigits: number): string {
  let result: string = num.toString();
  while (result.length < numberOfDigits) {
    result = '0' + result;
  }
  return result;
}
