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
          <div class="column"></div>
          <div class="column">
            <h2>Institution</h2>
            <div>Jade Hochhochschule Oldenburg</div>
            <div>Ofener Str. 16/19</div>
            <div>Oldenburg</div>
          </div>
          <div class="column">
            <h2>Author</h2>
            <div>Kilian Glomb</div>
            <div>Matrikel-Nr.: 6026140</div>
            <div>E-Mail: kilian.glomb@student.jade-hs.de</div>
          </div>
        </div>
      </Host>
    );
  }
}
