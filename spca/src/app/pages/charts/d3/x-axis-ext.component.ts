import {
  Component,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
  OnChanges,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';

import { XAxisTicksExtComponent } from './x-axis-ticks-ext.component';

import {
  XAxisComponent
 } from '@swimlane/ngx-charts/release/common/axes/x-axis.component';

@Component({
  selector: 'g[ngx-charts-x-axis-ext]',
  template: `
    <svg:g
      [attr.class]="xAxisClassName"
      [attr.transform]="transform">
      <svg:g ngx-charts-x-axis-ticks-ext
        *ngIf="xScale"
        [tickFormatting]="tickFormatting"
        [tickArguments]="tickArguments"
        [tickStroke]="tickStroke"
        [scale]="xScale"
        [orient]="xOrient"
        [showGridLines]="showGridLines"
        [gridLineHeight]="dims.height"
        [width]="dims.width"
        [xinfos]="xinfos"
        (dimensionsChanged)="emitTicksHeight($event)"
      />
      <svg:g ngx-charts-axis-label
        *ngIf="showLabel"
        [label]="labelText"
        [offset]="labelOffset"
        [orient]="'bottom'"
        [height]="dims.height"
        [width]="dims.width">
      </svg:g>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XAxisExtComponent extends XAxisComponent {
  //TODO
  @Input() results;
  @Input() xinfos;
  
  ngOnInit(): void {
    // console.log(this.xinfos);
  }

  emitTicksHeight({ height }): void {
    const newLabelOffset = height + 25 + 5 + 3;
    if (newLabelOffset !== this.labelOffset) {
      this.labelOffset = newLabelOffset;
      setTimeout(() => {
        this.dimensionsChanged.emit({height});
      }, 0);
    }
  }

}
