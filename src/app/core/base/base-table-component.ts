import {BaseComponent} from '@app/core/base/base-component';
import {Component, Input} from '@angular/core';
import {ColDef} from '@dashboard/models/coldef';

@Component({
  standalone: true,
  template: ''
})

export class BaseTableComponent extends BaseComponent{
  @Input() data: any[] = [];
  @Input() columns: ColDef[] = [];
}
