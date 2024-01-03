import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'page-footer',
  styleUrl: 'page-footer.scss',
  shadow: true,
})
export class PageFooter {
  render() {
    return (
      <Host>
        <div class="grid">
          <div class="column">
            <div>Bachelorarbeit von Kilian Glomb</div>
            <div>MatrikelNr.: 6026140</div>
            <div>kilian.glomb@student.jade-hs.de</div>
          </div>
          <div class="column">
            <div>Jade Hochhochschule Oldenburg</div>
            <div>Ofener Str. 16/19</div>
            <div>Oldenburg</div>
          </div>
          <div class="column"></div>
        </div>
      </Host>
    );
  }
}
