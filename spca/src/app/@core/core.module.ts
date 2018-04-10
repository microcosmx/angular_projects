import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { of as observableOf } from 'rxjs/observable/of';

import { throwIfAlreadyLoaded } from './module-import-guard';

import { D3LineService } from './data/d3-line.service';
import { SmartTableService } from './data/smart-table.service';


const NB_CORE_PROVIDERS = [
  D3LineService,
  SmartTableService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
