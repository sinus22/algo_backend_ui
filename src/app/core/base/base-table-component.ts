import {BaseComponent} from '@app/core/base/base-component';
import {Component, Input, OnDestroy, OnInit, signal} from '@angular/core';
import {ColDef} from '@dashboard/models/coldef';

@Component({
  standalone: true,
  template: ''
})

export abstract class BaseTableComponent<T> implements OnInit {
  data = signal<T[]>([]);
  totalItems = signal<number>(0);
  totalPages = signal<number>(0);
  currentPage = signal<number>(1);
  pageSize = signal<number>(10);
  sortColumn = signal<string>('id');
  sortDirection = signal<string>('desc');
  hasPreviousPage = signal<boolean>(true);
  hasNextPage = signal<boolean>(true);
  abstract columns: ColDef[];

  abstract fetchData(): void;

  ngOnInit(): void {
    this.fetchData();
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.fetchData();
  }

  onSortChange(sort: { column: string; order: string }) {
    this.sortColumn.set(sort.column);
    this.sortDirection.set(sort.order);
    this.fetchData();
  }
}
