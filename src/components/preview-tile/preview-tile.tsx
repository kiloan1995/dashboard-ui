import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'preview-tile',
  styleUrl: 'preview-tile.scss',
  shadow: true,
})
export class PreviewTile {
  @Prop() title: string = '10 days';
  @Prop() small: string = 'Time to Interview';
  @Prop() bIsAverage: boolean = false;

  averageSymbol: string = 'Ø';

  render() {
    return (
      <Host>
        <h1>{this.bIsAverage ? this.averageSymbol + this.title : this.title}</h1>
        <small>{this.small}</small>
      </Host>
    );
  }
}
