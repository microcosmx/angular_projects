

import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit, EventEmitter, Input, Output } from '@angular/core';
import { Globals } from '../../globals';
import { NbTabsetExtComponent } from './tabsetext.component';

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

  // items: any = ["RBV0"];

  constructor(private global: Globals) {
    this.runId = this.global.runid;
    this.resultId = this.global.resultid;
    this.fromSkuZone = this.global.fromskuzone;
  }

  ngOnInit(): void {
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
      `RBV-${info.runid}`,
      this.rbvContentTemplate,
      `RBV Content of ${info.runid}`,
      true
    );
  }

}
