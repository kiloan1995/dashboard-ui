import { Component, Host, h } from '@stencil/core';
import * as d3 from 'd3';

@Component({
  tag: 'chart-histogram',
  styleUrl: 'chart-histogram.scss',
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
    let jsonData = {
      data: [
        { bin: '0.0-0.1', frequency: 0 },
        { bin: '0.1-0.2', frequency: 53899 },
        { bin: '0.2-0.3', frequency: 4986 },
        { bin: '0.3-0.4', frequency: 728 },
        { bin: '0.4-0.5', frequency: 0 },
        { bin: '0.5-0.6', frequency: 0 },
        { bin: '0.6-0.7', frequency: 0 },
        { bin: '0.7-0.8', frequency: 0 },
        { bin: '0.8-0.9', frequency: 0 },
        { bin: '0.9-1.0', frequency: 0 },
      ],
    };

    let margin = { top: 10, right: 30, bottom: 30, left: 30 };
    let width = 460 - margin.left - margin.right;
    let height = 300 - margin.top - margin.bottom;
    const barCount = jsonData.data.length;
    const barGap = 4;
    // Declare the x (horizontal position) scale.
    let x = d3.scaleLinear().rangeRound([0, width]);

    // Declare the y (vertical position) scale.
    
    let y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(jsonData['data'], function (d) {
          return d.frequency;
        }),
      ])
      .range([height, 0]);

    // Create the SVG container.
    let svg = d3
      .select(this.svgContainer)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    let bar = svg
      .selectAll('.bar')
      .data(jsonData['data'])
      .enter()
      .append('g')
      .attr('class', 'bar')
      .attr('transform', function (d, i) {
        return 'translate(' + x(i / barCount) + ',' + y(d.frequency) + ')';
      });

    bar
      .append('rect')
      .attr('x', 1)
      .attr('width', width / barCount - barGap)
      .attr('height', function (d) {
        return height - y(d.frequency);
      });

    svg
      .append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));

    svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(height / 40))
      .call(g => g.select('.domain').remove())
      .call(g => g.append('text').attr('x', -margin.left).attr('y', 10).attr('fill', 'currentColor').attr('text-anchor', 'start').text('↑ Frequency (no. of counties)'));
  }
}
