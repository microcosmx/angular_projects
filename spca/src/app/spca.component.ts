
import { Component, OnInit } from '@angular/core';
import { Globals } from './globals';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class SpcaComponent implements OnInit {

  runId : string;
  resultId : string;
  fromSkuZone : string;

  constructor(
    private translate: TranslateService,
    private global: Globals
  ) {
    translate.addLangs(['en', 'zh']);
    translate.setDefaultLang('en');
    let broswerLang = translate.getBrowserLang();
    translate.use(broswerLang);
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }
  
  
  ngOnInit(): void {
    this.runId = this.getUrlParameter('runId');
    this.resultId = this.getUrlParameter('arg_objectID');
    this.fromSkuZone = this.getUrlParameter('arg_aggrlevel');
    this.global.runid = this.runId;
    this.global.resultid = this.resultId;
    this.global.fromskuzone = this.fromSkuZone;
  }
  
  getUrlParameter(sParam) {
      return decodeURIComponent(window.location.search.substring(1)).split('&')
             .map((v) => { return v.split("=") })
             .filter((v) => { return (v[0] === sParam) ? true : false })
             .reduce((prev, curv, index, array) => { return curv[1]; }, "undefined")
  }

  
  
}
