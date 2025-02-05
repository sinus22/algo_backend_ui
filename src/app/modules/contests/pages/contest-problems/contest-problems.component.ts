import {Component, inject, OnInit, signal} from '@angular/core';
import {ContestService} from '@app/modules/contests/services/contest.service';
import {ContestStanding} from '@app/modules/contests/models/contest-standing';
import {ColDef} from '@dashboard/models/coldef';
import {PaginatedResponse} from '@dashboard/models/paginationResponse';
import {ContestProblem} from '@app/modules/contests/models/contest-problem';
import {NftHeaderComponent} from '@dashboard/components/nft/nft-header/nft-header.component';
import {DatatableComponent} from '@shared/components/datatable/datatable.component';
import {BaseTableComponent} from '@app/core/base/base-table-component';

@Component({
  selector: 'app-contest-problems',
  imports: [
    NftHeaderComponent,
    DatatableComponent
  ],
  templateUrl: './contest-problems.component.html',
  standalone: true,
  styleUrl: './contest-problems.component.scss'
})
export class ContestProblemsComponent extends BaseTableComponent<ContestProblem> {
  private contestService = inject(ContestService);

  columns: ColDef[] = [
    {label: 'Id', key: 'id', sortable: true},
    {label: 'Contest Id', key: 'contestId', sortable: true},
    {label: 'Problem id', key: 'problemId', sortable: true},
    {label: 'Definition', key: 'definition', sortable: true},
    {
      label: 'Created at', key: 'createdAt', sortable: true, format: (value: any) =>
        new Date(value).toLocaleString()
    },
    {
      label: 'Updated at', key: 'updatedAt', sortable: true, format: (value: any) =>
        new Date(value).toLocaleString()
    },

  ];

  fetchData(): void {
    this.contestService
      .getContestProblems({
        page: this.currentPage(),
        pageSize: this.pageSize(),
        sort: this.sortColumn(),
        order: this.sortDirection()
      })
      .subscribe({
          next: (response) => {

            if (response.success) {
              console.log(response.data);
              const {items, totalItems, totalPages, page, pageSize, hasPreviousPage, hasNextPage} =
                response.data as PaginatedResponse<ContestProblem>;
              this.data.set(items);
              this.totalItems.set(totalItems);
              this.totalPages.set(totalPages);
              this.currentPage.set(page);
              this.pageSize.set(pageSize);
              this.hasPreviousPage.set(hasPreviousPage);
              this.hasNextPage.set(hasNextPage);
            }

          }
          ,
          error: (error) => {
            console.error('Xatolik yuz berdi:', error);
          }
        }
      );
  }
}
