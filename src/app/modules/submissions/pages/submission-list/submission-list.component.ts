import {Component, inject, OnInit, signal} from '@angular/core';
import {DatatableComponent} from '@shared/components/datatable/datatable.component';
import {NftHeaderComponent} from '@dashboard/components/nft/nft-header/nft-header.component';
import {Problem} from '@app/modules/problems/models/problem';
import {ColDef} from '@dashboard/models/coldef';
import {ProblemService} from '@app/modules/problems/services/problem.service';
import {PaginatedResponse} from '@dashboard/models/paginationResponse';
import {SubmissionService} from '@app/modules/submissions/services/submission.service';
import {Submission} from '@app/modules/submissions/models/submission';
import {BaseTableComponent} from '@app/core/base/base-table-component';

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
export class SubmissionListComponent extends BaseTableComponent<Submission> {
  private submissionService = inject(SubmissionService);
  columns: ColDef[] = [
    {label: 'Id', key: 'id', sortable: true},
    {label: 'Problem Id', key: 'problemId', sortable: true},
    {label: 'User Id', key: 'userId', sortable: true},
    {label: 'Lang', key: 'lang', sortable: true},
    {label: 'State', key: 'state', sortable: true},
    {label: 'Test Case', key: 'testCase', sortable: true},
  ]


  fetchData(): void {
    this.submissionService.getSubmissions({
      page: this.currentPage(),
      pageSize: this.pageSize(),
      sort: this.sortColumn(),
      order: this.sortDirection()
    }).subscribe({
      next: (response) => {
        if (response.success) {
          const paginated = response.data as PaginatedResponse<Submission>;
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
