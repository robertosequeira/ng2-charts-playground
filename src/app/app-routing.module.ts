import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OtherChartsComponent } from './other-charts/other-charts.component';
import { LineComponent } from './line/line.component';
import { BarComponent } from './bar/bar.component';

const routes: Routes = [
  { path: 'line', component: LineComponent },
  { path: 'bar', component: BarComponent },
  { path: 'other', component: OtherChartsComponent },
  { path: '', pathMatch: 'full', redirectTo: 'line' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
