import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType, PointStyle } from 'chart.js';
import { Color, Label, BaseChartDirective, ThemeService } from 'ng2-charts';

import { ToastrService } from '@common/toastr.service';
import { ChartsService } from '@common/charts.service';

interface ChartElement {
  _index: number;
  _datasetIndex: number;
  _chart: Chart;
  _model: any;
}

type SteppedLine = 'before' | 'after' | 'middle' | boolean;

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

  /* Misc: Settings initialized to default values */
  private fill = true;
  private pointStyles: PointStyle[] = ['circle', 'cross', 'crossRot', 'dash', 'line', 'rect', 'rectRounded', 'rectRot', 'star'];
  private pointStyle: PointStyle = 'circle';
  private radius = 3;
  private steppedStyles: SteppedLine[] = [true, false, 'before', 'after', 'middle'];
  private steppedStyle: SteppedLine = false;

  constructor(private toastrService: ToastrService, private chartsService: ChartsService) { }

  ngOnInit(): void {
    this.lineChartData = [
      { data: [65, 59, 80, 81, 56, 55, 40, 11, 78], label: '2018', fill: this.fill },
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
          pointStyle: this.pointStyle,
          radius: this.radius
        },
        // line: {
        //   stepped: true
        // }
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
    const nextStyleIndex = (this.pointStyles.indexOf(this.pointStyle) + 1) % this.pointStyles.length;
    this.pointStyle =  this.pointStyles[nextStyleIndex];

    // Any of following options work
    this.lineChartData.forEach(data => data.pointStyle = this.pointStyle);
    // this.chart.datasets.forEach(data => data.pointStyle = this.pointStyle);

    this.chart.update();
  }

  toggleChartType(): void {
    this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
  }

  toggleSteppedLine(): void {
    let nextStyleIndex: any;

    if (this.steppedStyle === true) {
      nextStyleIndex = 1;
    } else if (this.steppedStyle === false) {
      nextStyleIndex = 2;
    } else {
      nextStyleIndex = (this.steppedStyles.indexOf(this.steppedStyle) + 1) % this.steppedStyles.length;
    }

    this.steppedStyle = this.steppedStyles[nextStyleIndex];

    // Any of following options work
    this.lineChartData.forEach(data => data.steppedLine = this.steppedStyle);
    // this.chart.datasets.forEach(data => data.steppedLine = this.steppedStyle);

    this.chart.update();
  }

  public updateRadius(radius: number): void {
    radius += this.radius;

    if (radius < 0 || radius > 10) {
      return;
    }

    this.radius = radius;
    this.lineChartData.forEach(data => data.radius = this.radius);
    this.chart.update();
  }


  private getChartColors(n: number): Color[] {
    return this.chartsService.getColors(n).map(c => ({ borderColor: c.solid, backgroundColor: c.background }));
  }
}
