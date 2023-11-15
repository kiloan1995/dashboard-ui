import { Component, Host, Prop, h } from '@stencil/core';
import * as d3 from 'd3';

@Component({
  tag: 'chart-histogram',
  styleUrl: 'chart-histogram.scss',
  shadow: true,
})
export class ChartHistogram {
  svgContainer: HTMLDivElement;
  @Prop() yAxisLabel: string = 'Number of applications';
  @Prop() xAxisLabel: string = 'Month';

  render() {
    return (
      <Host>
        <div ref={ref => (this.svgContainer = ref)}></div>
      </Host>
    );
  }

  componentDidLoad() {
    let jsonData = [
      { type: 'January', value: 250 },
      { type: 'February', value: 53899 },
      { type: 'March', value: 4986 },
      { type: 'April', value: 728 },
      { type: 'May', value: 250 },
      { type: 'June', value: 53899 },
      { type: 'July', value: 0 },
      { type: 'August', value: 3000 },
      { type: 'September', value: 250 },
      { type: 'October', value: 10 },
    ];

    const desiredHeight: number = 448;

    const padding: number = desiredHeight / 14;
    let height = desiredHeight - padding * 2;
    let width = desiredHeight * 1.5 - padding * 2;
    const barCount = jsonData.length;
    const barGap = 4;
    // Declare the x (horizontal position) scale.
    let x = d3.scaleLinear().rangeRound([0, width]);

    const colors = d3.scaleOrdinal(d3.schemePastel1);

    // Declare the y (vertical position) scale.

    let y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(jsonData, function (d) {
          return d.value;
        }),
      ])
      .range([height, 0]);

    // Create the SVG container.
    let svg = d3
      .select(this.svgContainer)
      .append('svg')
      .attr('width', width + padding + padding)
      .attr('height', height + padding + padding)
      .append('g')
      .attr('transform', 'translate(' + padding + ',' + padding + ')');

    let horizontalbar = svg
      .selectAll('.bar')
      .data(jsonData)
      .enter()
      .append('g')
      .attr('class', 'bar')
      .attr('transform', function (d, i) {
        return 'translate(' + x(i / barCount) + ',' + y(d.value) + ')';
      });

    horizontalbar
      .append('rect')
      .attr('x', 1)
      .attr('width', width / barCount - barGap)
      .attr('height', function (d) {
        return height - y(d.value);
      })
      .attr('fill', function (d) {
        return colors(d.value);
      });

    svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(
        d3.axisBottom(x).tickFormat(function (d, i) {
          return jsonData[i].type;
        }),
      )
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-65)');

    svg
      .append('g')
      .attr('transform', `translate(${padding},0)`)
      .call(d3.axisLeft(y).ticks(height / 40))
      .call(g => g.select('.domain').remove())
      .call(g => g.append('text').classed('y-axis-label', true).attr('x', -padding).attr('y', 10).text(this.yAxisLabel));
  }
}
