

import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit, EventEmitter, Input, Output } from '@angular/core';
import { Globals } from '../../globals';
import { NbTabsetExtComponent } from './tabsetext.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: [
    './dashboard.component.scss',
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {

  runId : string;
  resultId : string;
  fromSkuZone : string;
  
  @ViewChild(NbTabsetExtComponent) tabsComponent;
  @ViewChild('rbvContent') rbvContentTemplate;

  rbvTab: string;

  // items: any = ["RBV0"];

  constructor(private global: Globals,
      private translate: TranslateService) {
    this.runId = this.global.runid;
    this.resultId = this.global.resultid;
    this.fromSkuZone = this.global.fromskuzone;
  }

  ngOnInit(): void {
    this.translate.get('rbvTab').subscribe((res: string) => {
      this.rbvTab = res;
    });
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

  onSelectActionClick(info: any): void{
    // this.items.push(`New Added RBV of ${scenarioId}`);
    this.openTab(info);
  }

  openTab(info: any) {
    this.tabsComponent.openTab(
      `${this.rbvTab} ${info.runid}`,
      this.rbvContentTemplate,
      {runid:info.runid,resultid:info.resultid,iszone:info.fromskuzone},
      true
    );
  }

}
