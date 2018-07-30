
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ContentChildren,
  QueryList,
  AfterContentInit,
  HostBinding,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  NbTabComponent, NbTabsetComponent
} from '@nebular/theme/components/tabset/tabset.component';
import {
  NbBadgeComponent
} from '@nebular/theme/components/badge/badge.component';

import { DynamicTabsDirective } from './dynamic-tabs.directive';


@Component({
  selector: 'nb-badge-ext',
  template: `
    <span class="nb-badge {{positionClass}} nb-badge-{{colorClass}}">{{text}}</span>
  `,
})
export class NbBadgeExtComponent extends NbBadgeComponent {
  
}

/**
 * Specific tab container.
 */
@Component({
  selector: 'nb-tab-ext',
  template: `
    <ng-container *ngIf="init">
      <ng-content></ng-content>
    </ng-container>
    <ng-container *ngIf="template"
      [ngTemplateOutlet]="template"
      [ngTemplateOutletContext]="{ rbv: dataContext }">
    </ng-container>
  `,
})
export class NbTabExtComponent extends NbTabComponent {
  
  @Input() template;
  @Input() dataContext: any;
  @Input() isCloseable: boolean;

  
}



@Component({
  selector: 'nb-tabset-ext',
  styleUrls: ['./tabsetext.component.scss'],
  template: `
    <ul>
      <li *ngFor="let tab of tabs"
          (click)="selectTab(tab)"
          [class.active]="tab.active">
        <a href (click)="$event.preventDefault()">{{ tab.tabTitle }}</a>
        <nb-badge-ext *ngIf="tab.badgeText"
          [text]="tab.badgeText"
          [status]="tab.badgeStatus"
          [position]="tab.badgePosition">
        </nb-badge-ext>
      </li>
      <!-- dynamic tabs -->
      <li *ngFor="let tab of dynamicTabs"
          (click)="selectTab(tab)"
          [class.active]="tab.active">
        <a href (click)="$event.preventDefault()">
          {{ tab.tabTitle }} 
          <span class="tab-close" *ngIf="tab.isCloseable" (click)="$event.preventDefault();closeTab(tab)">x</span> 
        </a>
      </li>
    </ul>
    <ng-content select="nb-tab-ext"></ng-content>
    <ng-template dynamic-tabs #container></ng-template>
  `,
})
export class NbTabsetExtComponent extends NbTabsetComponent {

  // @ViewChild('container', {read: ViewContainerRef}) dynamicTabPlaceholder;
  @ViewChild(DynamicTabsDirective)
  dynamicTabPlaceholder: DynamicTabsDirective;
  
  dynamicTabs: NbTabExtComponent[] = [];

  @ContentChildren(NbTabExtComponent) tabs: QueryList<NbTabExtComponent>;
  
  selectTab(selectedTab: NbTabExtComponent) {
    this.tabs.forEach(tab => tab.active = tab === selectedTab);
    this.dynamicTabs.forEach(tab => tab.active = tab === selectedTab);
    this.changeTab.emit(selectedTab);
  }

  constructor(
    private routeExt: ActivatedRoute,
    private _componentFactoryResolver: ComponentFactoryResolver
  ) {
    super(routeExt);
  }

  openTab(title, template, data, isCloseable = false) {
    let componentFactory = this._componentFactoryResolver.resolveComponentFactory(NbTabExtComponent);
  
    // get the viewcontainer
    let viewContainerRef = this.dynamicTabPlaceholder.viewContainer;
  
    // instantiate the component
    let componentRef = viewContainerRef.createComponent(componentFactory);
    let instance: NbTabExtComponent = componentRef.instance as NbTabExtComponent;
  
    // set the props
    instance.tabTitle = title;
    instance.template = template;
    instance.dataContext = data;
    instance.isCloseable = isCloseable;

    this.dynamicTabs.push(componentRef.instance as NbTabExtComponent);

    return instance;

    // set it active
    // this.selectTab(this.dynamicTabs[this.dynamicTabs.length - 1]);
  }

  closeTab(tab: NbTabExtComponent) {
    for(let i=0; i<this.dynamicTabs.length;i++) {
      if(this.dynamicTabs[i] === tab) {
        // remove the tab from our array
        this.dynamicTabs.splice(i,1);
        
        // destroy our dynamically created component again
        let viewContainerRef = this.dynamicTabPlaceholder.viewContainer;
        // let viewContainerRef = this.dynamicTabPlaceholder;
        viewContainerRef.remove(i);
        
        // set tab index to 1st one
        this.selectTab(this.tabs.first);
        break;
      }
    }
  }

  closeActiveTab() {
    let activeTabs = this.dynamicTabs.filter((tab)=>tab.active);
    if(activeTabs.length > 0)  {
      // close the 1st active tab (should only be one at a time)
      this.closeTab(activeTabs[0]);
    }
  }


}
