import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
// import { LoadingExtComponent } from './loading.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ChartsModule } from './charts/charts.module';
import { TablesModule } from './tables/tables.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';

const PAGES_COMPONENTS = [
  PagesComponent,
  // LoadingExtComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    ChartsModule,
    TablesModule,
    PagesRoutingModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}
