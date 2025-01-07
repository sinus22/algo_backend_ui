import {Component, OnInit, signal} from '@angular/core';
import {NftHeaderComponent} from '@dashboard/components/nft/nft-header/nft-header.component';
import {User} from '@dashboard/models/user';
import {UserService} from '@dashboard/service/user.service';
import {DatatableComponent} from '@shared/components/datatable/datatable.component';
import {PaginatedResponse} from '@dashboard/models/paginationResponse';
import {ColDef} from '@dashboard/models/coldef';
@Component({
  selector: 'app-users',
  imports: [
    NftHeaderComponent,
    // NftDualCardComponent,
    // NftSingleCardComponent,
    // NftChartCardComponent,
    // NftAuctionsTableComponent,
    // TableHeaderComponent,
    // TableRowComponent,
    // TableActionComponent,
    DatatableComponent,
    // AgGridModule,

  ],
  templateUrl: './users.component.html',
  standalone: true,
})

export class UsersComponent implements OnInit {
  users = signal<User[]>([]);
  totalItems = signal<number>(0);
  totalPages = signal<number>(0);
  currentPage = signal<number>(1);
  pageSize = signal<number>(10);
  sortColumn = signal<string>('id');
  sortDirection = signal<string>('desc');
  hasPreviousPage = signal<boolean>(true);
  hasNextPage = signal<boolean>(true);
  columns:ColDef[] = [
    {label: 'Id', key: 'id', sortable: true},
    {label: 'Username', key: 'username', sortable: true},
    {label: 'Email', key: 'email', sortable: true},
  ]

  constructor(private userService: UserService) {
  }


  loadUsers(): void {
    this.userService
      .getUsers(this.currentPage(), this.pageSize(), this.sortColumn(), this.sortDirection())
      .subscribe({
        next: (response) => {

          if (response.success) {
            const { items, totalItems, totalPages, page, pageSize, hasPreviousPage, hasNextPage } =
              response.data as PaginatedResponse<User>;
            this.users.set(items);
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

  ngOnInit(): void {
    this.loadUsers();

  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.loadUsers();
  }

  onSortChange(sort: { column: string, order: string }) {
    this.sortColumn.set(sort.column) ;
    this.sortDirection.set(sort.order);
    this.loadUsers();
  }
}
