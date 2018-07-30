

import { Component } from '@angular/core';
import { UIUtilsService } from '../@core/utils/ui-utils.service';

@Component({
  selector: 'ngx-pages',
  templateUrl: './pages.component.html'
})
export class PagesComponent {

  constructor(
    private uiUtils: UIUtilsService,
  ) {
  }

  ngOnInit(): void {
    this.uiUtils.startLoading();
  }
  

  
}
