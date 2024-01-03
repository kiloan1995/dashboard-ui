import { Component, Host, Prop, h } from '@stencil/core';
import * as d3 from 'd3';
import { IDataSetDate, IDataSetItemDate } from '../../global/DataSet';

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
        <div class="svg-container" ref={ref => (this.svgContainer = ref)}></div>
      </Host>
    );
  }

  componentDidLoad() {
    const jsonData: IDataSetDate[] = [
      {
        name: 'store employee',
        data: [
          { date: new Date('2022-01-01'), value: 250 },
          { date: new Date('2022-02-15'), value: 450 },
          { date: new Date('2022-03-01'), value: 350 },
          { date: new Date('2022-04-01'), value: 650 },
          { date: new Date('2022-05-01'), value: 550 },
          { date: new Date('2022-06-01'), value: 850 },
          { date: new Date('2022-07-01'), value: 750 },
        ],
      },
      {
        name: 'tech employee',
        data: [
          { date: new Date('2022-01-01'), value: 850 },
          { date: new Date('2022-02-15'), value: 950 },
          { date: new Date('2022-03-01'), value: 650 },
          { date: new Date('2022-04-01'), value: 750 },
          { date: new Date('2022-05-01'), value: 450 },
          { date: new Date('2022-06-01'), value: 550 },
          { date: new Date('2022-07-01'), value: 350 },
        ],
      },
    ];

    const desiredHeight: number = 448;
    const desiredWidth: number = 1440;

    const paddingHeight: number = desiredHeight / 14;
    const paddingWidth: number = 0;
    const height: number = desiredHeight - paddingHeight * 2;
    const width: number = desiredWidth;

    // Axis
    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    // create svg
    const svg = d3
      .select(this.svgContainer)
      .append('svg')
      .attr('width', width + paddingWidth * 2)
      .attr('height', height + paddingHeight * 2)
      .append('g')
      .attr('transform', 'translate(' + paddingHeight + ',' + paddingHeight + ')');

    // define Axis domains
    jsonData.forEach((set: IDataSetDate) => {
      x.domain(d3.extent(set.data, (item: IDataSetItemDate) => item.date));
      y.domain([0, d3.max(set.data, (item: IDataSetItemDate) => item.value)]);
    });

    // add x-axis
    svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x).ticks(d3.timeMonth.every(1)).tickFormat(d3.timeFormat('%b %Y')));

    // add y-axis
    svg.append('g').call(d3.axisLeft(y));

    // create line generator

    let line = d3
      .line()
      .x((item: IDataSetItemDate) => x(item.date))
      .y((item: IDataSetItemDate) => y(item.value));

    const colors = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, jsonData.length + 1));
    jsonData.forEach((set: IDataSetDate) => {
      svg.append('path').datum(set.data).attr('fill', 'none').attr('stroke', colors(set.name)).attr('stroke-width', 1).attr('d', line);
    });
  }
}
