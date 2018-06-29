import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { NbTabsetExtComponent, NbTabExtComponent, NbBadgeExtComponent } from './tabsetext.component';
import { DynamicTabsDirective } from './dynamic-tabs.directive';

import { ChartsModule } from '../charts/charts.module';
import { TablesModule } from '../tables/tables.module';

import { TranslateModule } from '@ngx-translate/core';


const components = [
  DashboardComponent,
  NbTabsetExtComponent,
  NbTabExtComponent,
  NbBadgeExtComponent,
  DynamicTabsDirective
];


@NgModule({
  imports: [
    ThemeModule,
    ChartsModule,
    TablesModule,
    TranslateModule.forChild(),
  ],
  declarations: [
    ...components,
  ],
  entryComponents: [ NbTabExtComponent ]
})
export class DashboardModule { }
