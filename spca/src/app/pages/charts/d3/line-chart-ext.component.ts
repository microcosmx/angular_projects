import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  HostListener,
  ChangeDetectionStrategy,
  ContentChild,
  TemplateRef,
  SimpleChanges
} from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';
import { scaleLinear, scaleTime, scalePoint } from 'd3-scale';
import { curveLinear } from 'd3-shape';

import {
  BaseChartComponent, LineChartComponent
 } from '@swimlane/ngx-charts';

@Component({
  selector: 'ngx-charts-line-chart-ext',
  template: `
    <ngx-charts-chart-ext
      [view]="[width, height]"
      [showLegend]="legend"
      [legendOptions]="legendOptions"
      [activeEntries]="activeEntries"
      [animations]="animations"
      (legendLabelClick)="onClick($event)"
      (legendLabelActivate)="onActivate($event)"
      (legendLabelDeactivate)="onDeactivate($event)">
      <svg:defs>
        <svg:clipPath [attr.id]="clipPathId">
          <svg:rect
            [attr.width]="dims.width + 10"
            [attr.height]="dims.height + 10"
            [attr.transform]="'translate(-5, -5)'"/>
        </svg:clipPath>
      </svg:defs>
      <svg:g [attr.transform]="transform" class="line-chart chart">
        <svg:g ngx-charts-x-axis-ext
          *ngIf="xAxis"
          [xScale]="xScale"
          [dims]="dims"
          [showGridLines]="showGridLines"
          [showLabel]="showXAxisLabel"
          [labelText]="xAxisLabel"
          [results]="results"
          [xinfos]="xinfos"
          [tickFormatting]="xAxisTickFormatting"
          (dimensionsChanged)="updateXAxisHeight($event)">
        </svg:g>
        <svg:g ngx-charts-y-axis
          *ngIf="yAxis"
          [yScale]="yScale"
          [dims]="dims"
          [showGridLines]="showGridLines"
          [showLabel]="showYAxisLabel"
          [labelText]="yAxisLabel"
          [tickFormatting]="yAxisTickFormatting"
          [referenceLines]="referenceLines"
          [showRefLines]="showRefLines"
          [showRefLabels]="showRefLabels"
          (dimensionsChanged)="updateYAxisWidth($event)">
        </svg:g>
        <svg:g [attr.clip-path]="clipPath">
          <svg:g *ngFor="let series of displayedResults; trackBy:trackBy" [@animationState]="'active'">
            <svg:g ngx-charts-line-series
              [xScale]="xScale"
              [yScale]="yScale"
              [colors]="colors"
              [data]="series"
              [activeEntries]="activeEntries"
              [scaleType]="scaleType"
              [curve]="curve"
              [rangeFillOpacity]="rangeFillOpacity"
              [hasRange]="hasRange"
              [animations]="animations"
            />
          </svg:g>

          <svg:g *ngIf="!tooltipDisabled" (mouseleave)="hideCircles()">
            <svg:g ngx-charts-tooltip-area-ext
              [dims]="dims"
              [xSet]="xSet"
              [xScale]="xScale"
              [yScale]="yScale"
              [results]="displayedResults"
              [colors]="colors"
              [tooltipDisabled]="true"
              [tooltipTemplate]="seriesTooltipTemplate"
              (hover)="updateHoveredVertical($event)"
            />

            <svg:g *ngFor="let series of displayedResults">
              <svg:g ngx-charts-circle-series-ext
                [xScale]="xScale"
                [yScale]="yScale"
                [colors]="colors"
                [data]="series"
                [pinfos]="pinfos"
                [scaleType]="scaleType"
                [visibleValue]="hoveredVertical"
                [activeEntries]="activeEntries"
                [tooltipDisabled]="tooltipDisabled"
                [tooltipTemplate]="tooltipTemplate"
                (select)="onClick($event, series)"
                (activate)="onActivate($event)"
                (deactivate)="onDeactivate($event)"
              />
            </svg:g>
          </svg:g>
        </svg:g>
      </svg:g>
      <svg:g ngx-charts-timeline
        *ngIf="timeline && scaleType != 'ordinal'"
        [attr.transform]="timelineTransform"
        [results]="results"
        [view]="[timelineWidth, height]"
        [height]="timelineHeight"
        [scheme]="scheme"
        [customColors]="customColors"
        [scaleType]="scaleType"
        [legend]="legend"
        (onDomainChange)="updateDomain($event)">
        <svg:g *ngFor="let series of displayedResults; trackBy:trackBy">
          <svg:g ngx-charts-line-series
            [xScale]="timelineXScale"
            [yScale]="timelineYScale"
            [colors]="colors"
            [data]="series"
            [scaleType]="scaleType"
            [curve]="curve"
            [hasRange]="hasRange"
            [animations]="animations"
          />
        </svg:g>
      </svg:g>
    </ngx-charts-chart-ext>
  `,
  styleUrls: ['./line-chart-ext.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('animationState', [
      transition(':leave', [
        style({
          opacity: 1,
        }),
        animate(500, style({
          opacity: 0
        }))
      ])
    ])
  ]
})
export class LineChartExtComponent extends LineChartComponent {
  //TODO
  @Input() xinfos;
  @Input() pinfos;

  hiddenSeries: Set<String> = new Set<String>();
  displayedResults: any = [];
  xtickInfos: any = {};

  seriesDesc: any = [];

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    
  }

  onClick(data, series?): void {
    if (series) { // circle click
      data.series = series.name;
      for(let item of this.xinfos){
        this.xtickInfos[item.name] = item;
      }
      data.extraInfo = this.xtickInfos[data.name]
    }else{ // legend click
      if(this.hiddenSeries.has(data)){
        this.hiddenSeries.delete(data);
      }else{
        this.hiddenSeries.add(data);
      }
      this.hideSeries();
      // console.log(this.results);
    }

    this.select.emit(data);

  }

  hideSeries(){
    this.displayedResults = this.results.filter(rlt => !this.hiddenSeries.has(rlt.name));
  }

  update(): void {
    super.update();

    this.hideSeries();

    this.seriesDesc = this.getSeriesDomainDesc();
    this.legendOptions = this.getLegendDescOptions();
  }

  getSeriesDomainDesc(): any[] {
    return this.results.map(d => d.value);
  }

  getLegendDescOptions() {
    let opts = this.getLegendOptions();
    if(this.seriesDesc.length > 0){
      opts.domainDesc = opts.domain.map((x, idx) => {
        return this.seriesDesc[idx] || x;
      })
    }
    return opts;
  }

  getLegendOptions() {
    const opts = {
      scaleType: this.schemeType,
      colors: undefined,
      domain: [],
      domainDesc: [],
      title: undefined
    };
    if (opts.scaleType === 'ordinal') {
      opts.domain = this.seriesDomain;
      opts.colors = this.colors;
      opts.title = this.legendTitle;
    } else {
      opts.domain = this.yDomain;
      opts.colors = this.colors.scale;
    }
    return opts;
  }

  getScaleType(values): string {
    return 'linear';
  }

  getXDomain(): any[] {
    let dmxSuper = super.getXDomain();

    if(this.xinfos.length < 6){
      let [min, max] = [...dmxSuper];
      let delta = (min + max)/10;
      return [min-delta, max+delta];
    }
    
    return dmxSuper;
  }

  getYDomain(): any[] {
    let dmySuper = super.getYDomain();

    let [min, max] = [...dmySuper];
    let delta = (min + max)/5;
    return [min-delta, max+delta];
  }
  
}

function deepCopy(obj) {
  var copy;

  // Handle the 3 simple types, and null or undefined
  if (null == obj || "object" != typeof obj) return obj;

  // Handle Date
  if (obj instanceof Date) {
      copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
  }

  // Handle Array
  if (obj instanceof Array) {
      copy = [];
      for (var i = 0, len = obj.length; i < len; i++) {
          copy[i] = deepCopy(obj[i]);
      }
      return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
      copy = {};
      for (var attr in obj) {
          if (obj.hasOwnProperty(attr)) copy[attr] = deepCopy(obj[attr]);
      }
      return copy;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
}
