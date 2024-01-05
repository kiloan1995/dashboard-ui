import { Component, Host, h, Prop, Event, EventEmitter, State } from '@stencil/core';
import { FunctionLibrary } from '../../global/FunctionLibrary';
import { UrlHelper } from '../../global/UrlHelper';

@Component({
  tag: 'filter-picker',
  styleUrl: 'filter-picker.scss',
  shadow: true,
})
export class FilterPicker {
  @Prop() urlParamName: string = 'startDate';
  @Event() dateChanged: EventEmitter<Date>;
  @State() date: Date = new Date();
  inputRef: HTMLInputElement;

  componentWillLoad() {
    let selDate = UrlHelper.getUrlParam(this.urlParamName);
    if (selDate) {
      this.date = FunctionLibrary.customDateToDate(selDate);
    } else {
      UrlHelper.setUrlParam(this.urlParamName, FunctionLibrary.dateToStringBeautiful(new Date(), '-'));
    }
  }

  render() {
    let date: string =
      this.date.getUTCFullYear() + '-' + FunctionLibrary.addLeadingZeroes(this.date.getUTCMonth() + 1, 2) + '-' + FunctionLibrary.addLeadingZeroes(this.date.getUTCDate(), 2);
    let now: Date = new Date();
    let maxDate: string = now.getUTCFullYear() + '-' + FunctionLibrary.addLeadingZeroes(now.getUTCMonth() + 1, 2) + '-' + FunctionLibrary.addLeadingZeroes(now.getUTCDate(), 2);
    return (
      <Host>
        <input ref={ref => (this.inputRef = ref)} onChange={event => this.onChange(event)} type="date" id="start" max={maxDate} value={date} />
      </Host>
    );
  }
  onChange(event: any) {
    event.stopPropagation();
    event.preventDefault();
    console.log(this.inputRef.value);
    let newDate = FunctionLibrary.htmlInputDateToCustomDate(this.inputRef.value);
    UrlHelper.setUrlParam(this.urlParamName, newDate);
    this.dateChanged.emit(FunctionLibrary.customDateToDate(newDate));
  }
}
