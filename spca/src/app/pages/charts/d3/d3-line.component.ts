

import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit, EventEmitter, Input, Output } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

import { D3LineService } from '../../../@core/data/d3-line.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-d3-line',
  styleUrls: ['./d3-line.component.scss'],
  templateUrl: './d3-line.component.html',
})
export class D3LineComponent implements OnInit, AfterViewInit, OnDestroy {

  multi = [];
  xinfos = [];
  pinfos = {};
  view = [];

  roundDomains = true;
  autoScale = true;
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

  constructor(
    private theme: NbThemeService, 
    private service: D3LineService,
    private translate: TranslateService
  ) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      this.colorScheme = {
        domain: [colors.primaryLight, colors.infoLight, colors.successLight, colors.warningLight, colors.dangerLight],
      };
    });

    this.translate.get('spcaChart.yAxisLabel').subscribe((res: string) => {
      this.yAxisLabel = res;
    });

    this.multi = this.service.data.result.series;
    this.xinfos = this.service.data.result.xinfos;
    this.pinfos = this.service.data.result.pinfos;
  }

  ngOnInit(): void {
    this.service.getD3Lines()
      .then(data => {
        this.multi = data.result.series;
        this.xinfos = data.result.xinfos;
        this.pinfos = data.result.pinfos;
        this.xAxisLabel = `ScenarioID: ${data.result.baseInfos.scenarioId}/${data.result.baseInfos.scenarioName}`;
        //resize chart view based on the window size
        
        setTimeout(function(){
          this.view = [window.innerWidth - 60, 360 ]; 
          // let event = null;
          // if(typeof(Event) === 'function') {
          //   event = new Event("resize");
          // }else{
          //   event = document.createEvent("resize");
          //   event.initEvent("resize", true, true);
          // }
          // window.dispatchEvent(event);
        }.bind(this), 1200);
      });
  }

  ngAfterViewInit(): void {
    setTimeout(function(){
      this.view = [window.innerWidth - 60, 360 ]; 
    }.bind(this), 600);
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  onSelect(event): void{
    console.log(event);
    if(typeof event === "object"){
      (event.series=="New Price") && this.onSelectAction.emit(event.extraInfo);
    }
  }

  // [view]="view"
  onResize(event) { 
    this.view = [event.target.innerWidth - 60, 360 ]; 
  }

}
