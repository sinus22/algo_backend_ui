import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseComponent} from '@app/core/base/base-component';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-pagination',
  imports: [
    NgClass
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  standalone: true
})
export class PaginationComponent extends BaseComponent implements OnInit{
  ngOnInit(): void {
  }
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 20;
  @Input() hasPreviousPage: boolean = false;
  @Input() hasNextPage: boolean = true;
  @Output() pageChange = new EventEmitter<number>();

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
}
