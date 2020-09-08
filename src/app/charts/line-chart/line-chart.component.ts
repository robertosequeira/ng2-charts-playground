import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType, PointStyle } from 'chart.js';
import { Color, Label, BaseChartDirective } from 'ng2-charts';

import { ToastrService } from '@common/toastr.service';
import { ChartsService, BasicChartElement } from '@common/charts.service';

type SteppedLine = 'before' | 'after' | 'middle' | boolean;

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  @ViewChild(BaseChartDirective, { static: true }) chartRef: BaseChartDirective;

  public lineChartData: ChartDataSets[];
  public lineChartLabels: Label[];
  public lineChartOptions: ChartOptions;
  public lineChartType: ChartType = 'line';
  public lineChartColors: Color[];
  public lineChartLegend = true;
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
    const bugs = this.chartsService.bugs(15, 45);

    this.lineChartData = bugs.map(y => ({ label: y.label, data: Object.values(y.data) }));
    this.lineChartLabels = Object.keys(bugs[0].data);
    this.lineChartOptions = {
      title: {
        display: true,
        text: 'Bugs per month'
      },
      elements: {
        point: {
          pointStyle: this.pointStyle,
          radius: this.radius
        }
      }
    };

    this.lineChartColors = this.getChartColors(this.lineChartData.length);
  }

  public chartClicked(e: { event: MouseEvent, active: BasicChartElement[] }): void {
    const chartElement = this.chartRef.chart.getElementAtEvent(e.event)[0] as BasicChartElement;

    if (chartElement) {
      const index = chartElement._index;
      const month = this.chartRef.labels[index];
      const datasetIndex = chartElement._datasetIndex;
      const dataset = this.chartRef.datasets[datasetIndex];
      const value = dataset.data[index];
      const year = dataset.label;

      this.toastrService.success(`Bugs reported on ${month} ${year}: ${value}`);
    }
  }

  public toggleFill(): void {
    this.fill = !this.fill;

    // Any of following options work
    // this.lineChartData.forEach(data => data.fill = this.fill);
    this.chartRef.datasets.forEach(data => data.fill = this.fill);

    this.chartRef.update();
  }

  toggleColors(): void {
    // Any of following options work
    // this.lineChartColors = this.getChartColors(this.chartRef.datasets.length);
    this.chartRef.colors = this.getChartColors(this.chartRef.datasets.length);
  }

  togglePointStyle(): void {
    const nextStyleIndex = (this.pointStyles.indexOf(this.pointStyle) + 1) % this.pointStyles.length;
    this.pointStyle =  this.pointStyles[nextStyleIndex];

    // Any of following options work
    // this.lineChartData.forEach(data => data.pointStyle = this.pointStyle);
    this.chartRef.datasets.forEach(data => data.pointStyle = this.pointStyle);

    this.chartRef.update();
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
    // this.lineChartData.forEach(data => data.steppedLine = this.steppedStyle);
    this.chartRef.datasets.forEach(data => data.steppedLine = this.steppedStyle);

    this.chartRef.update();
  }

  public updateRadius(radius: number): void {
    radius += this.radius;

    if (radius < 0 || radius > 10) {
      return;
    }

    this.radius = radius;
    // this.lineChartData.forEach(data => data.radius = this.radius);
    this.chartRef.datasets.forEach(data => data.radius = this.radius);

    this.chartRef.update();
  }

  public getChartColors(n: number): Color[] {
    return this.chartsService.getColors(n).map(c => ({ borderColor: c.solid, backgroundColor: c.light }));
  }
}
