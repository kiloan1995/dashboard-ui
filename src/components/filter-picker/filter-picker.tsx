import { Component, Host, h, Prop } from '@stencil/core';
import { FunctionLibrary } from '../../global/FunctionLibrary';

@Component({
  tag: 'filter-picker',
  styleUrl: 'filter-picker.scss',
  shadow: true,
})
export class FilterPicker {
  @Prop() urlParamName: string = 'startDate';
  inputRef: HTMLInputElement;

  componentWillLoad() {
    let selDate = FunctionLibrary.getUrlParam(this.urlParamName);
    if (!selDate) {
      FunctionLibrary.setUrlParam(this.urlParamName, FunctionLibrary.dateToStringBeautiful(new Date(), '-'));
    }
  }

  render() {
    const date = new Date();
    let maxDate: string = date.getFullYear() + '-' + FunctionLibrary.addLeadingZeroes(date.getUTCMonth() + 1, 2) + '-' + FunctionLibrary.addLeadingZeroes(date.getDay(), 2);
    let minDate: string = date.getFullYear() - 4 + '-' + FunctionLibrary.addLeadingZeroes(date.getUTCMonth() + 1, 2) + '-' + FunctionLibrary.addLeadingZeroes(date.getDay(), 2);
    return (
      <Host>
        <input ref={ref => (this.inputRef = ref)} onChange={event => this.onChange(event)} type="date" id="start" value={maxDate} min={minDate} max={maxDate} />
      </Host>
    );
  }
  onChange(event: any) {
    event.stopPropagation();
    event.preventDefault();
    let newDate = FunctionLibrary.htmlInputDateToCustomDate(this.inputRef.value);
    FunctionLibrary.setUrlParam(this.urlParamName, newDate);
  }
}
