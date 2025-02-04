import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ColDef} from '@dashboard/models/coldef';
import {NgForOf} from '@angular/common';
import {BaseComponent} from '@app/core/base/base-component';

@Component({
  selector: 'app-table',
  imports: [
    NgForOf
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  standalone: true
})
export class TableComponent extends BaseComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() columns: ColDef[] = [];


  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }



}
