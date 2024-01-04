import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';
import { IconHelper } from '../../global/IconHelper';

@Component({
  tag: 'list-view',
  styleUrl: 'list-view.scss',
  shadow: true,
})
export class ListView {
  @Prop() items: any[] = [];
  @Prop() title: string = 'All jobs';
  @Prop() columnNames: string[] = ['Id', 'Title', 'Ø Time till interview', 'Ø Time till hired', 'Ø Time till rejected'];
  @Prop() fillTablePredicate?: (item: any) => string[];
  @Event() itemClicked: EventEmitter<any>;

  render() {
    if (this.items?.length > 0) {
      return (
        <Host>
          <h1 class="title">{this.title}</h1>
          <table class="table">
            {this.renderHeader()}
            {this.items.map(item => this.renderListItem(item))}
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
    let columnNames = [...this.columnNames];
    columnNames.push(''); // add empty column name for the svg icons.
    return (
      <tr class="header">
        {columnNames.map(name => {
          return <th class="cell">{name}</th>;
        })}
      </tr>
    );
  }

  renderListItem(item: any) {
    let values: string[] = this.fillTablePredicate(item);
    if (!values) return;
    return (
      <tr class="row" onClick={event => this.onClick(event, item)}>
        {values.map(value => {
          return <td class="cell">{value}</td>;
        })}
        <td class="cell">{IconHelper.icon('login', '#c7c9ca')}</td>
      </tr>
    );
  }

  onClick(event: any, item: any) {
    event.preventDefault();
    event.stopPropagation();
    this.itemClicked.emit(item);
  }
}
