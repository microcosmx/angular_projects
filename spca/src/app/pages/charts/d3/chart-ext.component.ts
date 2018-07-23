import {
    Component, Input, OnChanges, ViewContainerRef, ChangeDetectionStrategy, EventEmitter,
    Output, SimpleChanges
} from '@angular/core';
import {
    trigger,
    style,
    animate,
    transition
} from '@angular/animations';
import {
    TooltipService, ChartComponent
} from '@swimlane/ngx-charts';

@Component({
    providers: [TooltipService],
    selector: 'ngx-charts-chart-ext',
    template: `
      <div
        class="ngx-charts-outer"
        [style.width.px]="view[0]"
        [@animationState]="'active'"
        [@.disabled]="!animations">
        <svg
          class="ngx-charts"
          [attr.width]="chartWidth"
          [attr.height]="view[1]">
          <ng-content></ng-content>
        </svg>
        <ngx-charts-scale-legend
          *ngIf="showLegend && legendType === 'scaleLegend'"
          class="chart-legend"
          [valueRange]="legendOptions.domain"
          [colors]="legendOptions.colors"
          [height]="view[1]"
          [width]="legendWidth">
        </ngx-charts-scale-legend>
        <ngx-charts-legend-ext
          *ngIf="showLegend && legendType === 'legend'"
          class="chart-legend"
          [data]="legendOptions.domain"
          [dataDesc]="legendOptions.domainDesc"
          [title]="legendOptions.title"
          [colors]="legendOptions.colors"
          [height]="view[1]"
          [width]="legendWidth"
          [activeEntries]="activeEntries"
          (labelClick)="legendLabelClick.emit($event)"
          (labelActivate)="legendLabelActivate.emit($event)"
          (labelDeactivate)="legendLabelDeactivate.emit($event)">
        </ngx-charts-legend-ext>
      </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('animationState', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('500ms 100ms', style({ opacity: 1 }))
            ])
        ])
    ]
})
export class ChartExtComponent extends ChartComponent {

    

}
