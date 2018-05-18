

import { Component, OnInit, ViewChild } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { AgGridNg2 } from 'ag-grid-angular';

@Component({
  selector: 'ngx-cost',
  styleUrls: ['./cost.component.scss'],
  templateUrl: './cost.component.html',
})
export class CostComponent {

  @ViewChild('agGrid') agGrid: AgGridNg2;

  title = 'app';

  // columnDefs = [
  //   { headerName: 'Make', field: 'make', checkboxSelection: true },
  //   { headerName: 'Model', field: 'model' },
  //   { headerName: 'Price', field: 'price' }
  // ];

  columnDefs = [
    {
      headerName: "Basic Info",
      children: [
        { headerName: "Product ID", field: "ProductID", width: 80 },
        { headerName: "Product Name", field: "ProductName", width: 120 },
        { headerName: "Supplier ID", field: "SupplierID", width: 80 }
      ]
    },
    {
      headerName: "Price",
      children: [
        { headerName: "Unit Cost Old", field: "UnitCostOld", width: 120 },
        { headerName: "Unit Cost New", field: "UnitCostNew", width: 120 },
        { headerName: "Unit Price", field: "UnitPrice", width: 120 },
        { headerName: "Units In Stock", field: "UnitsInStock", width: 120 }
      ]
    }
  ];

  rowData: any;

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.rowData = this.http.get('/assets/products.json');
  }

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    const selectedDataStringPresentation = selectedData.map(node => node.make + ' ' + node.model).join(', ');
    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }
}
