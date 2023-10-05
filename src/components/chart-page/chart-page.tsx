import { Component, Host, h } from '@stencil/core';
// import { IChartData } from '../../global/chart-data';

// declare const canvasJS: any;

@Component({
  tag: 'chart-page',
  styleUrl: 'chart-page.scss',
  shadow: false,
})
export class ChartPage {
  render() {
    return (
      <Host>
        <h1 class="heading">Dashboard Ui Content</h1>
        <div class="chartContainer" id="chartContainer"></div>
        {/* {this.renderChart('', null)} */}
      </Host>
    );
  }
  // renderChart(title: string, datas: IChartData[]) {
  //   var chart = new canvasJS.CanvasJS.Chart('chartContainer', {
  //     title: {
  //       text: 'My First Chart in CanvasJS',
  //     },
  //     data: [
  //       {
  //         // Change type to "doughnut", "line", "splineArea", etc.
  //         type: 'column',
  //         dataPoints: [
  //           { label: 'apple', y: 10 },
  //           { label: 'orange', y: 15 },
  //           { label: 'banana', y: 25 },
  //           { label: 'mango', y: 30 },
  //           { label: 'grape', y: 28 },
  //         ],
  //       },
  //     ],
  //   });
  //   chart.render();
  // }
}
