import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  Renderer,
  ChangeDetectionStrategy,
  TemplateRef,
} from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';

import {
  TooltipArea
 } from '@swimlane/ngx-charts';

@Component({
  selector: 'g[ngx-charts-tooltip-area-ext]',
  template: `
    <svg:g>
      <svg:rect
        class="tooltip-area-ext"
        [attr.x]="0"
        y="0"
        [attr.width]="dims.width"
        [attr.height]="dims.height"
        style="opacity: 0; cursor: 'auto';"
        (mousemove)="mouseMove($event)"
        (mouseleave)="hideTooltip()"
      />
      <xhtml:ng-template #defaultTooltipTemplate let-model="model">
        <xhtml:div class="area-tooltip-container">
          <xhtml:div
            *ngFor="let tooltipItem of model"
            class="tooltip-item">
            <span
              class="tooltip-item-color"
              [style.background-color]="tooltipItem.color">
            </span>
            {{getToolTipText(tooltipItem)}}
          </xhtml:div>
        </xhtml:div>
      </xhtml:ng-template>
      <svg:rect
        #tooltipAnchor
        [@animationState]="anchorOpacity !== 0 ? 'active' : 'inactive'"
        class="tooltip-anchor"
        [attr.x]="anchorPos"
        y="0"
        [attr.width]="1"
        [attr.height]="dims.height"
        [style.opacity]="anchorOpacity"
        [style.pointer-events]="'none'"
        ngx-tooltip
        [tooltipDisabled]="tooltipDisabled"
        [tooltipPlacement]="'right'"
        [tooltipType]="'tooltip'"
        [tooltipSpacing]="15"
        [tooltipTemplate]="tooltipTemplate ? tooltipTemplate: defaultTooltipTemplate"
        [tooltipContext]="anchorValues"
        [tooltipImmediateExit]="true"
      />
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('animationState', [
      transition('inactive => active', [
        style({
          opacity: 0,
        }),
        animate(250, style({opacity: 0.7}))
      ]),
      transition('active => inactive', [
        style({
          opacity: 0.7,
        }),
        animate(250, style({opacity: 0}))
      ])
    ])
  ]
})
export class TooltipAreaExt extends TooltipArea {

  constructor(private renderer1: Renderer) { 
    super(renderer1);
  }

  mouseMove(event) {
    const xPos = event.pageX - event.target.getBoundingClientRect().left;

    const closestIndex = this.findClosestPointIndex(xPos);
    const closestPoint = this.xSet[closestIndex];
    this.anchorPos = this.xScale(closestPoint);
    this.anchorPos = Math.max(0, this.anchorPos);
    this.anchorPos = Math.min(this.dims.width, this.anchorPos);

    this.anchorValues = this.getValues(closestPoint);
    if (this.anchorPos !== this.lastAnchorPos) {
      if(typeof(MouseEvent) === 'function') {
        let ev = new MouseEvent('mouseleave', {bubbles: false});
        this.renderer1.invokeElementMethod(this.tooltipAnchor.nativeElement, 'dispatchEvent', [ev]);
      }else{
        if(document["createEventObject"]) {
          this.tooltipAnchor.nativeElement.fireEvent("mouseleave");
        } else {
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent("mouseleave", false, true);
            this.renderer1.invokeElementMethod(this.tooltipAnchor.nativeElement, 'dispatchEvent', [evt]);
            // this.tooltipAnchor.nativeElement.dispatchEvent(evt);
        }
      }
      this.anchorOpacity = 0.7;
      this.hover.emit({
        value: closestPoint
      });
      this.showTooltip();

      this.lastAnchorPos = this.anchorPos;
    }
  }

}
