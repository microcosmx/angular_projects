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

import { TranslateService } from '@ngx-translate/core';

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
          <tspan x="0" y="0">{{xtickInfos[tick] && xtickInfos[tick].reason || ""}}</tspan>
          <ng-container *ngIf="xtickInfos[tick] && xtickInfos[tick].runstate==='pass'; else tickNoPass">
            <tspan x="12" y="16">{{xtickInfos[tick] && (this.runId + ' ' + xtickInfos[tick].runid) || ""}}</tspan>
          </ng-container>
          <ng-template #tickNoPass>
            <tspan x="0" y="16">{{xtickInfos[tick] && (this.runId + ' ' + xtickInfos[tick].runid) || ""}}</tspan>
          </ng-template>
          <tspan x="0" y="32">{{xtickInfos[tick] && xtickInfos[tick].date || ""}}</tspan>
        </text>
        <svg:image *ngIf="xtickInfos[tick] && xtickInfos[tick].runstate==='pass'" x="-40" y="4" width="16" height="16" xlink:href="assets/images/pass.png"></image>
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
  runId: string = "";

  constructor(private translate: TranslateService) {
    super();
    this.translate.get('runId').subscribe((res: string) => {this.runId = res;});
  }

  ngOnInit(): void {
    // console.log(this.xinfos);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.xinfos);
    for(let item of this.xinfos){
      this.xtickInfos[item.name] = item;
    }
    // console.log(this.xtickInfos);

    this.update();
  }

  // getTicks() {
  //   let ticks;
  //   const maxTicks = this.getMaxTicks(10);
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


// export function reduceTicks(ticks, maxTicks) {
//   if (ticks.length > maxTicks) {
//     const reduced = [];
//     const modulus = Math.floor(ticks.length / maxTicks);
//     for (let i = 0; i < ticks.length; i++) {
//       if (i % modulus === 0) {
//         reduced.push(ticks[i]);
//       }
//     }
//     ticks = reduced;
//   }

//   return ticks;
// }

