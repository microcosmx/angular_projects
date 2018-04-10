import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ThemeModule } from '../../@theme/theme.module';

import { ChartsRoutingModule, routedComponents } from './charts-routing.module';
import { D3LineComponent } from './d3/d3-line.component';
import { D3LineService } from '../../@core/data/d3-line.service';

import { LineChartExtComponent } from './d3/line-chart-ext.component';
import { XAxisExtComponent } from './d3/x-axis-ext.component';
import { XAxisTicksExtComponent } from './d3/x-axis-ticks-ext.component';
import { TooltipAreaExt } from './d3/tooltip-area-ext.component';
import { CircleSeriesExtComponent } from './d3/circle-series.component';

const components = [
  D3LineComponent,
  LineChartExtComponent,
  XAxisExtComponent,
  XAxisTicksExtComponent,
  TooltipAreaExt,
  CircleSeriesExtComponent,
];

@NgModule({
  exports: components,
  imports: [ThemeModule, ChartsRoutingModule, NgxChartsModule],
  declarations: [...routedComponents, ...components],
  providers: [
    D3LineService,
  ],
})
export class ChartsModule {}
