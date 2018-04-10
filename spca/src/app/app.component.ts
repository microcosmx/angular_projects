
import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'zh']);
    translate.setDefaultLang('en');
    let broswerLang = translate.getBrowserLang();
    translate.use(broswerLang);
  }

  ngOnInit(): void {
    this.translate.get('demo.title').subscribe((res: string) => {
      console.log(res);
    });
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }
}
