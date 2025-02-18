import {Component, inject, OnInit, signal} from '@angular/core';
import {ColDef} from '@dashboard/models/coldef';
import {UserService} from '@app/modules/users/services/user.service';
import {PaginatedResponse} from '@dashboard/models/paginationResponse';
import {NftHeaderComponent} from '@dashboard/components/nft/nft-header/nft-header.component';
import {DatatableComponent} from '@shared/components/datatable/datatable.component';
import {Faculty} from '@app/modules/users/models/faculty';
import {BaseTableComponent} from '@app/core/base/base-table-component';

@Component({
  selector: 'app-faculties',
  imports: [
    NftHeaderComponent,
    DatatableComponent
  ],
  templateUrl: './faculties.component.html',
  standalone: true,
  styleUrl: './faculties.component.scss'
})
export class FacultiesComponent extends BaseTableComponent<Faculty> {
  private userService = inject(UserService);
  columns: ColDef[] = [
    {label: 'Id', key: 'id', sortable: true},
    {label: 'Name', key: 'name', sortable: true},
    {label: 'University id', key: 'universityId', sortable: true},
    {label: 'Status', key: 'status', sortable: true},
    {
      label: 'Created At', key: 'createdAt', sortable: true, format: (value: any) =>
        new Date(value).toLocaleString()
    },
    {
      label: 'Updated At', key: 'updatedAt', sortable: true, format: (value: any) =>
        new Date(value).toLocaleString()
    },
  ]


  fetchData(): void {
    this.userService
      .getFaculties({
        page: this.currentPage(),
        pageSize: this.pageSize(),
        sort: this.sortColumn(),
        order: this.sortDirection()
      })
      .subscribe({
          next: (response) => {

            if (response.success) {
              const {items, totalItems, totalPages, page, pageSize, hasPreviousPage, hasNextPage} =
                response.data as PaginatedResponse<Faculty>;
              this.data.set(items);
              console.log(items);
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
