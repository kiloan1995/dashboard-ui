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
          return <a href={breadcrumb.url}>{breadcrumb.label + (i + 1 < this.breadcrumbs.length ? '>' : '')}</a>;
        })}
      </Host>
    );
  }
}
