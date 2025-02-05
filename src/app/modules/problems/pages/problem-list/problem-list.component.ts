import {Component, inject, OnInit, signal} from '@angular/core';
import {Problem} from '@app/modules/problems/models/problem';
import {ColDef} from '@dashboard/models/coldef';
import {ProblemService} from '@app/modules/problems/services/problem.service';
import {PaginatedResponse} from '@dashboard/models/paginationResponse';
import {NftHeaderComponent} from '@dashboard/components/nft/nft-header/nft-header.component';
import {DatatableComponent} from '@shared/components/datatable/datatable.component';
import {BaseTableComponent} from '@app/core/base/base-table-component';

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
export class ProblemListComponent extends BaseTableComponent<Problem> {
  private problemService = inject(ProblemService);

  columns: ColDef[] = [
    {label: 'Id', key: 'id', sortable: true},
    {label: 'Num', key: 'num', sortable: true},
    {label: 'Title', key: 'title', sortable: true},
    {label: 'Body', key: 'body', sortable: true},
    {label: 'Status', key: 'status', sortable: true},
    {label: 'Time Limit', key: 'timeLimit', sortable: true},
    {label: 'Memory Limit', key: 'memoryLimit', sortable: true},
  ]

  fetchData() {
    this.problemService.getProblems({
      page: this.currentPage(),
      pageSize: this.pageSize(),
      sort: this.sortColumn(),
      order: this.sortDirection()
    }).subscribe({
      next: (response) => {
        if (response.success) {
          const paginated = response.data as PaginatedResponse<Problem>;
          this.data.set(paginated.items)
          this.totalItems.set(paginated.totalItems);
          this.totalPages.set(paginated.totalPages);
          this.currentPage.set(paginated.page);
          this.pageSize.set(paginated.pageSize);
          this.hasPreviousPage.set(paginated.hasPreviousPage);
          this.hasNextPage.set(paginated.hasNextPage);
        }
      }
    })
  }
}
