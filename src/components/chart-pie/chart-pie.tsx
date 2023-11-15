import { Component, Host, h } from '@stencil/core';
import * as d3 from 'd3';

@Component({
  tag: 'chart-pie',
  styleUrl: 'chart-pie.scss',
  shadow: true,
})
export class ChartHistogram {
  svgContainer: HTMLDivElement;

  render() {
    return (
      <Host>
        <div ref={ref => (this.svgContainer = ref)}></div>
      </Host>
    );
  }

  componentDidLoad() {
    let jsonData = [
      { type: 'Store Employee', value: 250 },
      { type: 'Store Manager', value: 53899 },
      { type: 'Tech Employee', value: 4986 },
      { type: 'Tech Manager', value: 728 },
      { type: 'Apprentice', value: 0 },
      { type: 'Apprentice Tech', value: 10 },
      { type: 'Apprentice Store', value: 3000 },
    ];

    let totalValue: number = 0;
    jsonData.forEach(entry => {
      totalValue += entry.value;
    });

    const width: number = 800;
    const height: number = width;
    const diagramInnerRadius: number = 64;
    const diagramOuterRadius: number = 192;
    // const colors = d3.scaleOrdinal(d3.schemeDark2);
    const colors = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, jsonData.length + 1));
    const data = d3
      .pie()
      .sort(null)
      .value(function (d) {
        return d.value;
      })(jsonData);

    const svg = d3.select(this.svgContainer).append('svg').style('background', 'pink').attr('width', width).attr('height', height);
    const segments = d3.arc().innerRadius(diagramInnerRadius).outerRadius(diagramOuterRadius).padAngle(0.05).padRadius(50);
    const sections = svg.append('g').attr('transform', 'translate(250, 250)').selectAll('path').data(data);
    sections
      .enter()
      .append('path')
      .attr('d', segments)
      .attr('fill', function (d) {
        return colors(d.data.value);
      });

    const content = svg.select('g').selectAll('text').data(data);
    content
      .enter()
      .append('text')
      .classed('inside', true)
      .each(function (d) {
        let center: number[] = segments.centroid(d);
        d3.select(this)
          .attr('x', center[0])
          .attr('y', center[1])
          .text(round((d.data.value / totalValue) * 100) + '%');
      });
    const legends = svg.append('g').attr('transform', 'translate(500, 300)').selectAll('.legends').data(data);
    const legend = legends
      .enter()
      .append('g') //append g element to avoid selecting existing g element.
      .classed('legends', true)
      .attr('transform', function (d, i) {
        return 'translate(0,' + i * 30 + ')';
      });
    legend
      .append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', 10)
      .attr('fill', function (d) {
        return colors(d.data.value);
      });
    legend
      .append('text')
      .classed('label', true)
      .text(function (d) {
        return d.data.type;
      })
      .attr('fill', function (d) {
        return colors(d.data.value);
      })
      .attr('x', 20)
      .attr('y', 0)
      .attr('height', 40);

    legend
      .append('text')
      .classed('labelValues', true)
      .text(function (d) {
        return d.data.value;
      })
      .attr('x', 128)
      .attr('y', 0);
  }
}

function round(num: number, decimals: number = 2) {
  let exp = Math.pow(10, decimals);
  return Math.round((num + Number.EPSILON) * exp) / exp;
}
