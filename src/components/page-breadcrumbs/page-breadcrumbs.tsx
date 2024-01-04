import { Component, Host, h, Prop } from '@stencil/core';
import { Breadcrumb } from '../../global/Breadcrumb';
import { UrlHelper } from '../../global/UrlHelper';

@Component({
  tag: 'page-breadcrumbs',
  styleUrl: 'page-breadcrumbs.scss',
  shadow: true,
})
export class PageBreadcrumbs {
  @Prop() breadcrumbs: Breadcrumb[] = [];

  render() {
    return (
      <Host>
        {this.breadcrumbs.map((breadcrumb, i) => {
          return (
            <div class="link-container">
              <button class={{ first: i == 0 }} onClick={event => this.onClick(event, breadcrumb.url)}>
                {breadcrumb.label}
              </button>
              {i + 1 < this.breadcrumbs.length && <div class="thingy">{'>'}</div>}
            </div>
          );
        })}
      </Host>
    );
  }

  onClick(event: any, path: string) {
    event.stopPropagation();
    event.preventDefault();
    UrlHelper.navigateTo(path);
  }
}
