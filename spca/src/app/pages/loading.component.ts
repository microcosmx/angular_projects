

import {
  Component,
  Input,
} from '@angular/core';


@Component({
  selector: 'ngx-loading-ext',
  templateUrl: './loading.component.html'
})
export class LoadingExtComponent {
  @Input() loading: boolean = false;

}
