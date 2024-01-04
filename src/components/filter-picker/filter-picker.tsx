import { Component, Host, h, Prop } from '@stencil/core';
import { FunctionLibrary } from '../../global/FunctionLibrary';

@Component({
  tag: 'filter-picker',
  styleUrl: 'filter-picker.scss',
  shadow: true,
})
export class FilterPicker {
  @Prop() urlParamName: string = 'startDate';
  @Prop() date: Date = new Date();
  inputRef: HTMLInputElement;

  componentWillLoad() {
    let selDate = FunctionLibrary.getUrlParam(this.urlParamName);
    if (selDate) {
      this.date = FunctionLibrary.customDateToDate(selDate);
    } else {
      FunctionLibrary.setUrlParam(this.urlParamName, FunctionLibrary.dateToStringBeautiful(new Date(), '-'));
    }
  }

  render() {
    let maxDate: string =
      this.date.getFullYear() + '-' + FunctionLibrary.addLeadingZeroes(this.date.getUTCMonth() + 1, 2) + '-' + FunctionLibrary.addLeadingZeroes(this.date.getDay(), 2);
    let minDate: string =
      this.date.getFullYear() - 4 + '-' + FunctionLibrary.addLeadingZeroes(this.date.getUTCMonth() + 1, 2) + '-' + FunctionLibrary.addLeadingZeroes(this.date.getDay(), 2);
    return (
      <Host>
        <input ref={ref => (this.inputRef = ref)} onChange={event => this.onChange(event)} type="date" id="start" value={maxDate} min={minDate} max={maxDate} />
      </Host>
    );
  }
  onChange(event: any) {
    event.stopPropagation();
    event.preventDefault();
    console.log(this.inputRef.value);
    let newDate = FunctionLibrary.htmlInputDateToCustomDate(this.inputRef.value);
    FunctionLibrary.setUrlParam(this.urlParamName, newDate);
  }
}
