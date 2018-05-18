

import { Component, OnInit, ViewChild } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { AgGridNg2 } from 'ag-grid-angular';

@Component({
  selector: 'ngx-comp',
  styleUrls: ['./comp.component.scss'],
  templateUrl: './comp.component.html',
})
export class CompComponent {

  private gridApi;
  private gridColumnApi;

  private columnDefs;
  private defaultColDef;
  private rowData;

  constructor() {
    this.columnDefs = [
      {
        headerName: "Editable A",
        field: "a",
        editable: true,
        valueParser: numberValueParser
      },
      {
        headerName: "Editable B",
        field: "b",
        editable: true,
        valueParser: numberValueParser
      },
      {
        headerName: "Editable C",
        field: "c",
        editable: true,
        valueParser: numberValueParser
      },
      {
        headerName: "API D",
        field: "d",
        valueParser: numberValueParser,
        cellRenderer: "agAnimateShowChangeCellRenderer"
      },
      {
        headerName: "API E",
        field: "e",
        valueParser: numberValueParser,
        cellRenderer: "agAnimateShowChangeCellRenderer"
      },
      {
        headerName: "Total",
        valueGetter: "data.a + data.b + data.c + data.d + data.e",
        volatile: true,
        cellRenderer: "agAnimateShowChangeCellRenderer"
      },
      {
        headerName: "Average",
        valueGetter: "(data.a + data.b + data.c + data.d + data.e) / 5",
        volatile: true,
        cellRenderer: "agAnimateSlideCellRenderer"
      }
    ];
    this.defaultColDef = {
      valueFormatter: function(params) {
        return formatNumber(params.value);
      },
      cellClass: "align-right"
    };
    this.rowData = createRowData();
  }

  onUpdateSomeValues() {
    var rowCount = this.gridApi.getDisplayedRowCount();
    for (var i = 0; i < 10; i++) {
      var row = Math.floor(Math.random() * rowCount);
      var rowNode = this.gridApi.getDisplayedRowAtIndex(row);
      rowNode.setDataValue("d", Math.floor(Math.random() * 10000));
      rowNode.setDataValue("e", Math.floor(Math.random() * 10000));
    }
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();

    setInterval(function(){
      this.onUpdateSomeValues();
    }.bind(this),3000);
  }
}

function createRowData() {
  var rowData = [];
  for (var i = 0; i < 20; i++) {
    rowData.push({
      a: Math.floor(((i + 323) * 25435) % 10000),
      b: Math.floor(((i + 323) * 23221) % 10000),
      c: Math.floor(((i + 323) * 468276) % 10000),
      d: 0,
      e: 0
    });
  }
  return rowData;
}
function numberValueParser(params) {
  return Number(params.newValue);
}
function formatNumber(number) {
  return Math.floor(number)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}