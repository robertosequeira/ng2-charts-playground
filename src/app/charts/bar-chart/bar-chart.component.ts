import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, BaseChartDirective, Color, SingleOrMultiDataSet } from 'ng2-charts';

import { ToastrService } from '@common/toastr.service';
import { ChartsService, BasicChartElement } from '@common/charts.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  // @ViewChild(BaseChartDirective, { static: true }) chartRef: BaseChartDirective;
  @ViewChildren(BaseChartDirective) chartRefs !: QueryList<BaseChartDirective>;

  public barChartData: ChartDataSets[];
  public barChartLabels: Label[];
  public barChartOptions: ChartOptions;
  public stackedBarChartOptions: ChartOptions;
  public barChartType: ChartType = 'bar';
  public barChartColors: Color[];
  public barChartLegend = true;
  public barChartPlugins = [];

  /* Misc: Settings initialized to default values */
  private borders = true;

  constructor(private toastrService: ToastrService, private chartsService: ChartsService) { }

  ngOnInit(): void {
    const bugs = this.chartsService.bugs(45, 80);

    this.barChartData = bugs.map((year, i) => ({ label: year.label, data: Object.values(year.data)}));
    this.barChartLabels = Object.keys(bugs[0].data);
    this.barChartColors = this.getChartColors(bugs.length);

    this.barChartOptions = {
      responsive: true,
      title: { text: 'Bugs per month', display: true },
      elements: {
        rectangle: {
          borderWidth: 2,
        }
      }
    };

    this.stackedBarChartOptions = {
      responsive: true,
      title: { text: 'Bugs per month stacked', display: true },
      elements: {
        rectangle: {
          borderWidth: 2,
        }
      },
      scales: {
        xAxes: [{
          stacked: true
        }],
        yAxes: [{
          stacked: true
        }]
      }
    };
  }

  chartClicked(e: { event: MouseEvent, active: BasicChartElement[] }): void {
    // const ref = this.chartRefs.toArray()[0];
    // const ref = this.chartRefs.first;
    const ref = this.chartRefs.find(r => r.options.title.text === 'Bugs per month');
    const chartElement = ref.chart.getElementAtEvent(e.event)[0] as BasicChartElement;

    if (chartElement) {
      // ref can be used to read data directly from chart
      const index = chartElement._index;
      const month = ref.labels[index];
      const datasetIndex = chartElement._datasetIndex;
      const dataset = ref.datasets[datasetIndex];
      const value = dataset.data[index];
      const year = dataset.label;

      this.toastrService.success(`Bugs reported on ${month} ${year}: ${value}`);
    }
  }

  stackedChartClicked(e: { event: MouseEvent, active: BasicChartElement[] }): void {
    // const ref = this.chartRefs.toArray()[1];
    // const ref = this.chartRefs.last;
    // const ref = this.chartRefs.find(r => r.options.title.text === 'Bugs per month stacked');
    // const chartElement = ref.chart.getElementAtEvent(e.event)[0] as BasicChartElement;

    const chartElement = e.active[0]._chart.getElementAtEvent(e.event)[0] as BasicChartElement;

    if (chartElement) {
      // local variable also can be used to access chart data since the chart is getting references to these
      const index = chartElement._index;
      const month = this.barChartLabels[index];
      const datasetIndex = chartElement._datasetIndex;
      const dataset = this.barChartData[datasetIndex];
      const value = dataset.data[index];
      const year = dataset.label;

      this.toastrService.success(`Stacked chart: Bugs reported on ${month} ${year}: ${value}`);
    }
  }

  toggleType(): void {
    this.barChartType = this.barChartType === 'bar' ? 'horizontalBar' : 'bar';
  }

  toggleColors(): void {
    const colors = this.getChartColors(this.barChartData.length);

    // Any of following options work
    // this.barChartColors = this.getChartColors(this.barChartData.length);
    this.chartRefs.forEach(r =>  r.colors = colors);
  }

  toggleBorders(): void {
    this.borders = !this.borders;

    this.chartRefs.forEach(ref => {
      ref.datasets.forEach(data => {
        data.borderWidth = this.borders ? 2 : 0;
        data.hoverBorderWidth = this.borders ? 3 : 0;
      });
    });

    this.chartRefs.forEach(ref => ref.update());
  }

  private getChartColors(n: number): Color[] {
    return this.chartsService.getColors(n).map((c, i) => {
      return {
        // borderWidth: ,
        backgroundColor: c.med,
        borderColor: c.strong,
        hoverBackgroundColor: c.strong,
        hoverBorderColor: c.solid,
        hoverBorderWidth: this.borders ? 3 : 0
      };
    });
  }
}
