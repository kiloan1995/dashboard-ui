import { Component, Host, Prop, h } from '@stencil/core';
import * as d3 from 'd3';

@Component({
  tag: 'chart-index',
  styleUrl: 'chart-index.scss',
  shadow: true,
})
export class ChartIndex {
  svgContainer: HTMLDivElement;

  @Prop() textTotal: string = 'Applications';

  render() {
    return (
      <Host>
        <div ref={ref => (this.svgContainer = ref)}></div>
      </Host>
    );
  }

  componentDidLoad() {
    const jsonData = [
      { date: new Date('2022-07-02'), value: 250 },
      { date: new Date('2022-03-02'), value: 350 },
      { date: new Date('2022-01-02'), value: 450 },
      { date: new Date('2022-01-02'), value: 550 },
      { date: new Date('2022-08-02'), value: 650 },
      { date: new Date('2022-01-02'), value: 750 },
      { date: new Date('2022-12-02'), value: 850 },
    ];

    const desiredHeight: number = 448;

    const padding: number = desiredHeight / 14;
    const height: number = desiredHeight - padding * 2;
    const width: number = height * 1.5;

    // Axis
    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    const svg = d3
      .select(this.svgContainer)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + padding + ',' + padding + ')');

    // define Axis domains
    x.domain(d3.extent(jsonData, d => d.date));
    y.domain([0, d3.max(jsonData, d => d.value)]);

    // add x-axis
    svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x).ticks(d3.timeMonth.every(1)).tickFormat(d3.timeFormat('%b %Y')));

    // add y-axis
    svg.append('g').call(d3.axisLeft(y));

    // create line generator
    const line = d3
      .line()
      .x(d => x(d.date))
      .y(d => y(d.value));

    svg.append('path').datum(jsonData).attr('fill', 'none').attr('stroke', 'steelblue').attr('stroke-width', 1).attr('d', line);
  }
}
