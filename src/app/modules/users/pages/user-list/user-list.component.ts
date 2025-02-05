import {Component, inject, OnInit, signal} from '@angular/core';
import {User} from '@app/modules/users/models/user';
import {ColDef} from '@dashboard/models/coldef';
import {UserService} from '@app/modules/users/services/user.service';
import {PaginatedResponse} from '@dashboard/models/paginationResponse';
import {NftHeaderComponent} from '@dashboard/components/nft/nft-header/nft-header.component';
import {DatatableComponent} from '@shared/components/datatable/datatable.component';
import {BaseTableComponent} from '@app/core/base/base-table-component';

@Component({
  selector: 'app-user-list',
  imports: [
    NftHeaderComponent,
    DatatableComponent
  ],
  templateUrl: './user-list.component.html',
  standalone: true,
  styleUrl: './user-list.component.scss'
})
export class UserListComponent extends BaseTableComponent<User> {
  private userService = inject(UserService);
  columns: ColDef[] = [
    {label: 'Id', key: 'id', sortable: true},
    {label: 'Username', key: 'username', sortable: true},
    {label: 'Email', key: 'email', sortable: true},
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
      .getUsers({
        page: this.currentPage(),
        pageSize: this.pageSize(),
        sort: this.sortColumn(),
        order: this.sortDirection()
      })
      .subscribe({
          next: (response) => {

            if (response.success) {
              const {items, totalItems, totalPages, page, pageSize, hasPreviousPage, hasNextPage} =
                response.data as PaginatedResponse<User>;
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
