

import { Injectable } from '@angular/core';

@Injectable()
export class UIUtilsService {

  loadingMask:any = null;

  constructor() {
  }

  startLoading() {
    document.querySelector("#loading-mark-screen").className="loading-mark";
  }

  endLoading() {
    document.querySelector("#loading-mark-screen").className="element-hidden";
  }
}