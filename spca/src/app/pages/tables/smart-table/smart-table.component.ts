import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableService } from '../../../@core/data/smart-table.service';
import { CustomRenderComponent } from './custom-render.component';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: [
    './smart-table.component.scss',
  ],
})
export class SmartTableComponent implements OnInit, AfterViewInit {

  settings = {
    editable: false,
    pager: false,
    filter: false,
    sort: false,
    hideHeader: true,
    actions: false,
    columns: {
      column1: {
        title: 'column1',
        type: 'custom',
        filter: false,
        width: '30%',
        renderComponent: CustomRenderComponent,
      },
      column2: {
        title: 'column2',
        type: 'custom',
        filter: false,
        width: '30%',
        renderComponent: CustomRenderComponent,
      },
      column3: {
        title: 'column3',
        type: 'custom',
        filter: false,
        width: '30%',
        renderComponent: CustomRenderComponent,
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableService) {
    const data = this.service.getData();
    this.source.load(data.result);
  }


  ngOnInit(): void {
    this.service.getSpcas()
      .then(data => {
        this.source.load(data.result);
      });
  }

  ngAfterViewInit(): void {

  }
}
