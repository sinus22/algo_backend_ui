import {Component, inject, OnInit, signal} from '@angular/core';
import {ContestService} from '@app/modules/contests/services/contest.service';
import {Contest} from '@app/modules/contests/models/contest';
import {ColDef} from '@dashboard/models/coldef';
import {PaginatedResponse} from '@dashboard/models/paginationResponse';
import {NftHeaderComponent} from '@dashboard/components/nft/nft-header/nft-header.component';
import {DatatableComponent} from '@shared/components/datatable/datatable.component';
import {BaseTableComponent} from '@app/core/base/base-table-component';

@Component({
  selector: 'app-contest-list',
  imports: [
    NftHeaderComponent,
    DatatableComponent
  ],
  templateUrl: './contest-list.component.html',
  standalone: true,
  styleUrl: './contest-list.component.scss'
})
export class ContestListComponent extends BaseTableComponent<Contest>{
  private contestService=inject(ContestService);

  columns: ColDef[] = [
    {label: 'Id', key: 'id', sortable: true},
    {label: 'Title', key: 'title', sortable: true},
    {
      label: 'Boshlanish vaqti', key: 'startDate', sortable: true, format: (value: any) =>
        new Date(value).toLocaleString()
    },
    {label: 'Davomiylik', key: 'duration', sortable: true},
    {label: 'Type', key: 'type', sortable: true},
    {label: 'Status', key: 'status', sortable: true},
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
      .getContests({
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
                response.data as PaginatedResponse<Contest>;
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
