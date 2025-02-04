import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {TableComponent} from '@app/core/components/table/table.component';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-sort-table',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './sort-table.component.html',
  standalone: true,
  styleUrl: './sort-table.component.scss'
})
export class SortTableComponent extends TableComponent {


  @Output() sortChange = new EventEmitter<{ column: string, order: string }>(); // Sort signali
  sortColumn: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  onSort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.sortChange.emit({column, order: this.sortDirection});
  }
}
