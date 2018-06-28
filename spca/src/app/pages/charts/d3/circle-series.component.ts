import {
  Component,
  Input,
  Output,
  SimpleChanges,
  EventEmitter,
  OnChanges,
  OnInit,
  ChangeDetectionStrategy,
  TemplateRef
} from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';

import {
  CircleSeriesComponent
 } from '@swimlane/ngx-charts';

 import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'g[ngx-charts-circle-series-ext]',
  template: `
    <svg:g *ngIf="circle">
      <defs>
        <svg:g ngx-charts-svg-linear-gradient
          orientation="vertical"
          [name]="gradientId"
          [stops]="circle.gradientStops"
        />
      </defs>
      <svg:rect
        *ngIf="barVisible && type === 'standard'"
        [@animationState]="'active'"
        [attr.x]="circle.cx - circle.radius"
        [attr.y]="circle.cy"
        [attr.width]="circle.radius * 2"
        [attr.height]="circle.height"
        [attr.fill]="gradientFill"
        class="tooltip-bar"
      />
      <svg:g ngx-charts-circle
        class="circle"
        [cx]="circle.cx"
        [cy]="circle.cy"
        [r]="circle.radius"
        [fill]="circle.color"
        [class.active]="isActive({name: circle.seriesName})"
        [pointerEvents]="circle.value === 0 ? 'none': 'all'"
        [data]="circle.value"
        [classNames]="circle.classNames"
        (select)="onClick($event, circle.label)"
        (activate)="activateCircle()"
        (deactivate)="deactivateCircle()"
        ngx-tooltip
        [tooltipDisabled]="tooltipDisabled"
        [tooltipPlacement]="'top'"
        [tooltipType]="'tooltip'"
        [tooltipTitle]="tooltipTemplate ? undefined : getTooltipText(circle)"
        [tooltipTemplate]="tooltipTemplate"
        [tooltipContext]="circle.data"
      />
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('animationState', [
      transition(':enter', [
        style({
          opacity: 0,
        }),
        animate(250, style({opacity: 1}))
      ])
    ])
  ]
})
export class CircleSeriesExtComponent extends CircleSeriesComponent {

  @Input() pinfos;
  
  emptyMessage = "";

  constructor(private translate: TranslateService) {
    super();
  }

  getTooltipText({ tooltipLabel, value, seriesName, min, max}): string {
    // return `
    //   <span class="tooltip-label">${seriesName} • ${tooltipLabel}</span>
    //   <span class="tooltip-val">${value.toLocaleString()}</span>
    //   <span class="tooltip-val">Customized Info</span>
    // `;
    // console.log(this.circle.data);
    let extraData = this.pinfos && this.pinfos[this.circle.data.series] && this.pinfos[this.circle.data.series][this.circle.data.name];
    this.translate.get('emptyMessage').subscribe((res: string) => {
      this.emptyMessage = res;
    });
    let resultString = '<span class="tooltip-label">Extra Informations:</span>';
    if(extraData){
      for(let item of extraData){
        resultString += `<span class="tooltip-val">${item.name}: ${item.value}</span>`;
      }
    }else{
      resultString += `<span class="tooltip-val">${this.emptyMessage}</span>`;
    }

    return resultString;
  }

  activateCircle(): void {
    // this.barVisible = true;
    this.activate.emit({name: this.data.name});
  }

  deactivateCircle(): void {
    // this.barVisible = false;
    this.circle.opacity = 0;
    this.deactivate.emit({name: this.data.name});
  }

}
