

import {
    Component, Input, ChangeDetectionStrategy, Output, EventEmitter,
    SimpleChanges, OnChanges, ChangeDetectorRef, ViewEncapsulation
} from '@angular/core';

import {
    formatLabel, LegendComponent
} from '@swimlane/ngx-charts';

@Component({
    selector: 'ngx-charts-legend-ext',
    template: `
      <div [style.width.px]="width">
        <header class="legend-title" *ngIf="title?.length > 0">
          <span class="legend-title-text">{{title}}</span>
        </header>
        <div class="legend-wrap">
          <ul class="legend-labels"
            [style.max-height.px]="height - 45">
            <li
              *ngFor="let entry of legendEntries; trackBy: trackBy"
              class="legend-label">
              <ngx-charts-legend-entry-ext
                [label]="entry.label"
                [formattedLabel]="entry.formattedLabel"
                [color]="entry.color"
                [isActive]="isActive(entry)"
                (select)="labelClick.emit($event)"
                (activate)="activate($event)"
                (deactivate)="deactivate($event)">
              </ngx-charts-legend-entry-ext>
            </li>
          </ul>
        </div>
      </div>
    `,
    styleUrls: ['./legend-ext.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LegendExtComponent extends LegendComponent {

    

}
