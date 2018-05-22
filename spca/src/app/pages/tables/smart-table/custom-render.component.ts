

import { Component, Input, OnInit } from '@angular/core';

import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
    <span style='font-weight:bold'>{{renderName}}</span>  
    <span style=''>{{renderValue}}</span>  
  `,
})
export class CustomRenderComponent implements ViewCell, OnInit {

  renderName: string;
  renderValue: string;

  @Input() value: any;
  @Input() rowData: any;

  ngOnInit() {
    let info = this.value;

    this.renderName = info.name ? (info.name + ":") : "";
    this.renderValue = info.value ? info.value : "";
  }

}


