import {
    Component,
    Input,
    Output,
    ChangeDetectionStrategy,
    HostListener,
    EventEmitter
} from '@angular/core';

import {
    LegendEntryComponent
} from '@swimlane/ngx-charts';

@Component({
    selector: 'ngx-charts-legend-entry-ext',
    template: `
      <span 
        [title]="formattedLabel"
        tabindex="-1"
        [class.active]="isActive"
        (click)="toggleSelection($event)">
        <span
          class="legend-label-color"
          [style.background-color]="selected?color:'white'"
          [style.border-style]="'solid'"
          [style.border-width]="'1px'"
          [style.border-color]="color"
          (click)="toggle.emit(formattedLabel)">
        </span>
        <span class="legend-label-text">
          {{trimmedLabel}}
        </span>
      </span>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LegendEntryExtComponent extends LegendEntryComponent {

    selected: boolean = true;

    toggleSelection(evt): void {
        this.selected = !this.selected;
        this.select.emit(this.formattedLabel);
    }

}
