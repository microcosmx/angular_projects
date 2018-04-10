import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {
  NbActionsModule,
  NbCardModule,
  NbLayoutModule,
  NbRouteTabsetModule,
  NbTabsetModule,
  NbThemeModule,
} from '@nebular/theme';

import { NbSecurityModule } from '@nebular/security';

import {
  SampleLayoutComponent,
} from './layouts';
import { DEFAULT_THEME } from './styles/theme.default';
import { COSMIC_THEME } from './styles/theme.cosmic';

const BASE_MODULES = [CommonModule, FormsModule, ReactiveFormsModule];

const NB_MODULES = [
  NbCardModule,
  NbLayoutModule,
  NbTabsetModule,
  NbRouteTabsetModule,
  NbActionsModule,
  NgbModule,
  NbSecurityModule, // *nbIsGranted directive
];

const COMPONENTS = [
  SampleLayoutComponent,
];

const PIPES = [
];

const NB_THEME_PROVIDERS = [
  ...NbThemeModule.forRoot(
    {
      name: 'default', //default, cosmic
    },
    [ DEFAULT_THEME, COSMIC_THEME ],
  ).providers,
];

@NgModule({
  imports: [...BASE_MODULES, ...NB_MODULES],
  exports: [...BASE_MODULES, ...NB_MODULES, ...COMPONENTS, ...PIPES],
  declarations: [...COMPONENTS, ...PIPES],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ThemeModule,
      providers: [...NB_THEME_PROVIDERS],
    };
  }
}
