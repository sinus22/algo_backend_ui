import {Component, OnInit, signal} from '@angular/core';
import {Problem} from '@dashboard/models/problem';
import {ColDef} from '@dashboard/models/coldef';
import {ProblemService} from '@dashboard/service/problem.service';
import {PaginatedResponse} from '@dashboard/models/paginationResponse';
import {NftHeaderComponent} from '@dashboard/components/nft/nft-header/nft-header.component';
import {DatatableComponent} from '@shared/components/datatable/datatable.component';

@Component({
  selector: 'app-problem-list',
  imports: [
    NftHeaderComponent,
    DatatableComponent
  ],
  templateUrl: './problem-list.component.html',
  standalone: true,
  styleUrl: './problem-list.component.scss'
})
export class ProblemListComponent implements OnInit {
  problems = signal<Problem[]>([]);
  // users: User[] = [];
  totalItems: number = 0;
  totalPages: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  hasPreviousPage: boolean = false;
  hasNextPage: boolean = true;
  sortColumn = signal<string>('id');
  sortDirection = signal<string>('desc');
  columns: ColDef[] = [
    {label: 'Id', key: 'id', sortable: true},
    {label: 'Num', key: 'num', sortable: true},
    {label: 'Title', key: 'title', sortable: true},
    {label: 'Body', key: 'body', sortable: true},
    {label: 'Status', key: 'status', sortable: true},
    {label: 'Time Limit', key: 'timeLimit', sortable: true},
    {label: 'Memory Limit', key: 'memoryLimit', sortable: true},
  ]

  constructor(private problemService: ProblemService) {
  }

  loadProblem() {
    this.problemService.getProblems(this.currentPage, this.itemsPerPage).subscribe({
      next: (response) => {
        if (response.success) {
          const paginated = response.data as PaginatedResponse<Problem>;
          this.problems.set(paginated.items)
          console.log(paginated.items);
          this.totalItems = paginated.totalItems;
          this.totalPages = paginated.totalPages;
          this.currentPage = paginated.page;
          this.itemsPerPage = paginated.pageSize;
          this.hasPreviousPage = paginated.hasPreviousPage;
          this.hasNextPage = paginated.hasNextPage;
        }

      }
    })
  }

  ngOnInit() {
    this.loadProblem();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadProblem();
  }

  onSortChange(sort: { column: string, order: string }) {
    this.sortColumn.set(sort.column);
    this.sortDirection.set(sort.order);
    this.loadProblem();
  }

}
