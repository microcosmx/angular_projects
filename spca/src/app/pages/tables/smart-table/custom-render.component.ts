

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

  @Input() value: string;
  @Input() rowData: any;

  ngOnInit() {
    let info = this.value.split(":");

    this.renderName = info[0]?info[0]+": ":"";
    this.renderValue = info[1];
  }

}


