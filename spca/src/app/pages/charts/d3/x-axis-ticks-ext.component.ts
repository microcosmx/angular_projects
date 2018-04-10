import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ElementRef,
  ViewChild,
  SimpleChanges,
  AfterViewInit,
  ChangeDetectionStrategy
} from '@angular/core';

import {
  XAxisTicksComponent
 } from '@swimlane/ngx-charts/release/common/axes/x-axis-ticks.component';

@Component({
  selector: 'g[ngx-charts-x-axis-ticks-ext]',
  template: `
    <svg:g #ticksel>
      <svg:g *ngFor="let tick of ticks" class="tick"
        [attr.transform]="tickTransform(tick)">
        <title>{{tickFormat(tick)}}</title>
        <text
          stroke-width="0.01"
          [attr.text-anchor]="textAnchor"
          [attr.transform]="textTransform"
          [style.font-size]="'12px'">
          <tspan x="0" y="0">{{trimLabel(tickFormat(xtickInfos[tick].reason || tick))}}</tspan>
          <tspan x="12" y="24">{{trimLabel(tickFormat(xtickInfos[tick].sid || tick))}}</tspan>
          <tspan x="0" y="48">{{trimLabel(tickFormat(xtickInfos[tick].date || tick))}}</tspan>
        </text>
        <svg:image *ngIf="xtickInfos[tick].runstate==='pass'" x="-30" y="8" width="24" height="24" xlink:href="assets/images/pass.png"></image>
      </svg:g>
    </svg:g>

    <svg:g *ngFor="let tick of ticks"
      [attr.transform]="tickTransform(tick)">
      <svg:g *ngIf="showGridLines"
        [attr.transform]="gridLineTransform()">
        <svg:line
          class="gridline-path gridline-path-vertical"
          [attr.y1]="-gridLineHeight"
          y2="0" />
      </svg:g>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XAxisTicksExtComponent extends XAxisTicksComponent {

  @Input() xinfos: any;

  xtickInfos: any = {};

  ngOnInit(): void {
    setTimeout(() => this.updateDims());

    console.log(this.xinfos);
    for(let item of this.xinfos){
      this.xtickInfos[item.name] = item;
    }
    console.log(this.xtickInfos);
  }

  // getTicks() {
  //   let ticks;
  //   const maxTicks = this.getMaxTicks(20);
  //   const maxScaleTicks = this.getMaxTicks(100);

  //   if (this.tickValues) {
  //     ticks = this.tickValues;
  //   } else if (this.scale.ticks) {
  //     ticks = this.scale.ticks.apply(this.scale, [maxScaleTicks]);
  //   } else {
  //     ticks = this.scale.domain();
  //     ticks = reduceTicks(ticks, maxTicks);
  //   }

  //   return ticks;
  // }

}
