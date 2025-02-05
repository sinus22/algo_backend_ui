import {Component, inject, OnInit, signal} from '@angular/core';
import {ContestService} from '@app/modules/contests/services/contest.service';
import {Contest} from '@app/modules/contests/models/contest';
import {ColDef} from '@dashboard/models/coldef';
import {PaginatedResponse} from '@dashboard/models/paginationResponse';
import {ContestStanding} from '@app/modules/contests/models/contest-standing';
import {NftHeaderComponent} from '@dashboard/components/nft/nft-header/nft-header.component';
import {DatatableComponent} from '@shared/components/datatable/datatable.component';
import {BaseTableComponent} from '@app/core/base/base-table-component';

@Component({
  selector: 'app-contest-standings',
  imports: [
    NftHeaderComponent,
    DatatableComponent
  ],
  templateUrl: './contest-standings.component.html',
  standalone: true,
  styleUrl: './contest-standings.component.scss'
})
export class ContestStandingsComponent extends BaseTableComponent<ContestStanding> {
  private contestService = inject(ContestService);


  columns: ColDef[] = [
    {label: 'Id', key: 'id', sortable: true},
    {label: 'Contest Id', key: 'contestId', sortable: true},
    {label: 'User Id', key: 'userId', sortable: true},
    {label: 'Problem id', key: 'problemId', sortable: true},
    {label: 'Wrong Attempt', key: 'wrongAttempt', sortable: true},
    {label: 'Is Accepted', key: 'isAccepted', sortable: true},
    {label: 'Time', key: 'time', sortable: true},
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
      .getContestStandings({
        page: this.currentPage(), pageSize: this.pageSize(), sort: this.sortColumn(), order: this.sortDirection()
      })
      .subscribe({
          next: (response) => {

            if (response.success) {
              const {items, totalItems, totalPages, page, pageSize, hasPreviousPage, hasNextPage} =
                response.data as PaginatedResponse<ContestStanding>;
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
