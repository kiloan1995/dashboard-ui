import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'page-breadcrumbs',
  styleUrl: 'page-breadcrumbs.scss',
  shadow: true,
})
export class PageBreadcrumbs {
  @Prop() breadcrumbs: { label: string; url: string }[] = [];

  render() {
    return (
      <Host>
        {this.breadcrumbs.map((breadcrumb, i) => {
          return (
            <div class="link-container">
              <a class={{ first: i == 0 }} href={breadcrumb.url}>
                {breadcrumb.label}
              </a>
              {i + 1 < this.breadcrumbs.length && <div class="thingy">{'>'}</div>}
            </div>
          );
        })}
      </Host>
    );
  }
}