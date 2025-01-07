import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {coerceBooleanProperty, coerceNumberProperty} from '@angular/cdk/coercion';
import {ColDef} from '@dashboard/models/coldef';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgClass,
  ],
  styleUrl: './datatable.component.scss'
})
export class DatatableComponent implements OnInit {

  @Input() data: any[] = [];
  @Input() columns: ColDef[] = [];
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 20;
  @Input() hasPreviousPage: boolean = false;
  @Input() hasNextPage: boolean = true;
  @Output() pageChange = new EventEmitter<number>(); // Sahifa o'zgarganda signal beradi
  @Output() sortChange = new EventEmitter<{ column: string, order: string }>(); // Sort signali


  sortColumn: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  ngOnInit(): void {

  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['hasPreviousPage']) {
  //     this.hasPreviousPage = coerceBooleanProperty(changes['hasPreviousPage'].currentValue);
  //   }
  //   if (changes['hasNextPage']) {
  //     this.hasNextPage = coerceBooleanProperty(changes['hasNextPage'].currentValue);
  //   }
  //   if (changes['currentPage']) {
  //     this.currentPage = coerceNumberProperty(changes['currentPage'].currentValue);
  //   }
  //   if (changes['totalPages']) {
  //     this.currentPage = coerceNumberProperty(changes['totalPages'].currentValue);
  //   }
  //
  //   console.log(changes);
  // }

  // ngOnDestroy(): void {
  //
  // }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChange.emit(this.currentPage);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.pageChange.emit(this.currentPage);
    }
  }

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
