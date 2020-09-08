import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LineComponent } from './line/line.component';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { RadarChartComponent } from './charts/radar-chart/radar-chart.component';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { PolarAreaChartComponent } from './charts/polar-area-chart/polar-area-chart.component';
import { DoughnutChartComponent } from './charts/doughnut-chart/doughnut-chart.component';
import { ScatterChartComponent } from './charts/scatter-chart/scatter-chart.component';
import { BubbleChartComponent } from './charts/bubble-chart/bubble-chart.component';
import { OtherChartsComponent } from './other-charts/other-charts.component';
import { BarComponent } from './bar/bar.component';

@NgModule({
  declarations: [
    AppComponent,
    LineComponent,
    OtherChartsComponent,
    LineChartComponent,
    BarChartComponent,
    RadarChartComponent,
    PieChartComponent,
    PolarAreaChartComponent,
    DoughnutChartComponent,
    ScatterChartComponent,
    BubbleChartComponent,
    BarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
