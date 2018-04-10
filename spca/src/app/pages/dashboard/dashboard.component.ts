

import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit, EventEmitter, Input, Output } from '@angular/core';

import { NbTabsetExtComponent } from './tabsetext.component';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: [
    './dashboard.component.scss',
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(NbTabsetExtComponent) tabsComponent;
  @ViewChild('rbvContent') rbvContentTemplate;

  // items: any = ["RBV0"];

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

  onSelectAction(scenarioId: any): void{
    // this.items.push(`New Added RBV of ${scenarioId}`);
    this.openTab(scenarioId);
  }

  openTab(scenarioId: string) {
    this.tabsComponent.openTab(
      `RBV-${scenarioId}`,
      this.rbvContentTemplate,
      `RBV Content of ${scenarioId}`,
      true
    );
  }

}
