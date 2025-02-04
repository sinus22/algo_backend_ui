import {Component, inject, OnInit, signal} from '@angular/core';
import {DatatableComponent} from '@shared/components/datatable/datatable.component';
import {NftHeaderComponent} from '@dashboard/components/nft/nft-header/nft-header.component';
import {Problem} from '@dashboard/models/problem';
import {ColDef} from '@dashboard/models/coldef';
import {ProblemService} from '@dashboard/service/problem.service';
import {PaginatedResponse} from '@dashboard/models/paginationResponse';
import {SubmissionService} from '@app/core/services/submissions/submission.service';
import {Submission} from '@app/modules/submissions/models/submission';

@Component({
  selector: 'app-submission-list',
  imports: [
    DatatableComponent,
    NftHeaderComponent
  ],
  templateUrl: './submission-list.component.html',
  standalone: true,
  styleUrl: './submission-list.component.scss'
})
export class SubmissionListComponent implements OnInit{
  data = signal<Submission[]>([]);
  // users: User[] = [];
  totalItems: number = 0;
  totalPages: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 20;
  hasPreviousPage: boolean = false;
  hasNextPage: boolean = true;
  sortColumn = signal<string>('id');
  sortDirection = signal<string>('desc');
  columns: ColDef[] = [
    {label: 'Id', key: 'id', sortable: true},
    {label: 'Problem Id', key: 'problemId', sortable: true},
    {label: 'User Id', key: 'userId', sortable: true},
    {label: 'Lang', key: 'lang', sortable: true},
    {label: 'State', key: 'state', sortable: true},
    {label: 'Test Case', key: 'testCase', sortable: true},
  ]

  submissionService: SubmissionService = inject(SubmissionService);

  loadSubmissions(): void  {
    this.submissionService.getSubmissions(this.currentPage, this.itemsPerPage).subscribe({
      next: (response) => {
        if (response.success) {
          const paginated = response.data as PaginatedResponse<Submission>;
          this.data.set(paginated.items)
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
    this.loadSubmissions();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadSubmissions();
  }

  onSortChange(sort: { column: string, order: string }) {
    this.sortColumn.set(sort.column);
    this.sortDirection.set(sort.order);
    this.loadSubmissions();
  }
}
