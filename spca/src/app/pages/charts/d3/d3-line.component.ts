

import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit, EventEmitter, Input, Output } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

import { D3LineService } from '../../../@core/data/d3-line.service';

@Component({
  selector: 'ngx-d3-line',
  styleUrls: ['./d3-line.component.scss'],
  templateUrl: './d3-line.component.html',
})
export class D3LineComponent implements OnInit, AfterViewInit, OnDestroy {

  multi = [];
  xinfos = [];
  pinfos = {};

  showLegend = true;
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  xAxisLabel = 'Scenario';
  showYAxisLabel = true;
  yAxisLabel = 'Price';
  legend=true;
  colorScheme: any;
  themeSubscription: any;
  // xAxisTickFormatting = function(tick) {
  //   console.log(tick);
  //   let tickLabel = `<tspan x="0" y="0">${tick.reason}</tspan>
  //     <tspan x="0" y="10">${tick.sid}</tspan>
  //     <tspan x="0" y="20">${tick.date}</tspan>`
  //   return tickLabel;
  // }

  @Output() onSelectAction = new EventEmitter<boolean>();

  constructor(private theme: NbThemeService, private service: D3LineService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      this.colorScheme = {
        domain: [colors.primaryLight, colors.infoLight, colors.successLight, colors.warningLight, colors.dangerLight],
      };
    });

    this.multi = this.service.data.series;
    this.xinfos = this.service.data.xinfos;
    this.pinfos = this.service.data.pinfos;
  }

  ngOnInit(): void {
    this.service.getD3Lines()
      .then(data => {
        this.multi = data.series;
        this.xinfos = data.xinfos;
        this.pinfos = data.pinfos;
      });
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  onSelect(event): void{
    console.log(event);
    if(typeof event === "object"){
      this.onSelectAction.emit(event.name);
    }
  }

}
