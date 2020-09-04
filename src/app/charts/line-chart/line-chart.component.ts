import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType, PointStyle } from 'chart.js';
import { Color, Label, BaseChartDirective } from 'ng2-charts';

import { ToastrService } from '@common/toastr.service';
import { ChartsService } from '@common/charts.service';

interface ChartElement {
  _index: number;
  _datasetIndex: number;
  _chart: Chart;
  _model: any;
}

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  public lineChartData: ChartDataSets[];
  public lineChartLabels: Label[];
  public lineChartOptions: ChartOptions;
  public lineChartColors: Color[];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  /* misc */
  fill = true;

  constructor(private toastrService: ToastrService, private chartsService: ChartsService) { }

  ngOnInit(): void {
    this.lineChartData = [
      { data: [65, 59, 80, 81, 56, 55, 40, 11, 78], label: '2018', fill: this.fill  },
      { data: [59, 64, 21, 26, 66, 7, 29, 34, 19], label: '2019', fill: this.fill },
      { data: [31, 9, 58, 23, 49, 96, 74, 29, 26], label: '2020', fill: this.fill }
    ];
    this.lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'];
    this.lineChartOptions = {
      responsive: true,
      title: {
        display: true,
        text: 'Bugs per month'
      },
      elements: {
        point: {
          pointStyle: 'circle',
          radius: 10
        },
        line: {
          stepped: false
        }
      }
    };

    this.lineChartColors = this.getChartColors(this.lineChartData.length);
  }

  public chartClicked(e: { event: MouseEvent, active: ChartElement[] }): void {
    const chartElement = this.chart.chart.getElementAtEvent(e.event)[0] as any as ChartElement;

    if (chartElement) {
      const index = chartElement._index;
      const month = this.chart.labels[index];
      const datasetIndex = chartElement._datasetIndex;
      const dataset = this.chart.datasets[datasetIndex];
      const value = dataset.data[index];
      const year = dataset.label;

      this.toastrService.success(`Bugs reported on ${month} ${year}: ${value}`);
    }
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public toggleFill(): void {
    this.fill = !this.fill;

    // Any of following options work
    // this.lineChartData.forEach(data => data.fill = this.fill);
    this.chart.datasets.forEach(data => data.fill = this.fill);

    this.chart.update();
  }

  toggleColors(): void {
    // Any of following options work
    // this.lineChartColors = this.getChartColors(this.chart.datasets.length);
    this.chart.colors = this.getChartColors(this.chart.datasets.length);
  }

  togglePointStyle(): void {
    const styles = ['circle', 'cross', 'crossRot', 'dash', 'line', 'rect', 'rectRounded', 'rectRot', 'star'];

    const currentPointStyle = this.chart.options.elements?.point?.pointStyle;
    const nextStyle = currentPointStyle ? (styles.indexOf(currentPointStyle) + 1) % styles.length : 0;

    /* this is mainly to keep track of the current setting but it does not apply the chage */
    this.lineChartOptions.elements.point.pointStyle = styles[nextStyle] as PointStyle;

    /* Any of both options work */
    this.lineChartData.forEach(data => data.pointStyle = styles[nextStyle] as PointStyle);
    // this.chart.datasets.forEach(data => data.pointStyle = styles[nextStyle] as PointStyle);

    this.chart.update();
  }

  toggleChartType(): void {
    this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
  }

  toggleSteppedLine(): void {
    const styles = [ true, false, 'before', 'after', 'middle'];

    const currentLineStyle = this.chart.options.elements.line.stepped;

    let nextStyle: any;

    if (currentLineStyle === true) {
      nextStyle = 1;
    } else if (currentLineStyle === false) {
      nextStyle = 2;
    } else {
      nextStyle = (styles.indexOf(currentLineStyle) + 1) % styles.length as any;
    }

    this.lineChartOptions.elements.line.stepped = styles[nextStyle] as any;
    this.lineChartData.forEach(data => data.steppedLine = styles[nextStyle] as any);
    // this.chart.datasets.forEach(data => data.steppedLine = styles[nextStyle] as PointStyle);

    this.chart.update();
  }


  private getChartColors(n: number): Color[] {
    return this.chartsService.getColors(n).map(c => ({ borderColor: c.solid, backgroundColor: c.background }));
  }
}
