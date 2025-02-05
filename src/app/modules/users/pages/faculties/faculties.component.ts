import {Component, OnInit, signal} from '@angular/core';
import {University} from '@app/modules/users/models/university';
import {ColDef} from '@dashboard/models/coldef';
import {UserService} from '@app/modules/users/services/user.service';
import {PaginatedResponse} from '@dashboard/models/paginationResponse';
import {NftHeaderComponent} from '@dashboard/components/nft/nft-header/nft-header.component';
import {DatatableComponent} from '@shared/components/datatable/datatable.component';
import {Faculty} from '@app/modules/users/models/faculty';

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
export class FacultiesComponent implements OnInit {
  data = signal<Faculty[]>([]);
  totalItems = signal<number>(0);
  totalPages = signal<number>(0);
  currentPage = signal<number>(1);
  pageSize = signal<number>(20);
  sortColumn = signal<string>('id');
  sortDirection = signal<string>('desc');
  hasPreviousPage = signal<boolean>(true);
  hasNextPage = signal<boolean>(true);
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

  constructor(private userService: UserService) {
  }


  loadFaculties(): void {
    this.userService
      .getFaculties(this.currentPage(), this.pageSize(), this.sortColumn(), this.sortDirection())
      .subscribe({
          next: (response) => {

            if (response.success) {
              const {items, totalItems, totalPages, page, pageSize, hasPreviousPage, hasNextPage} =
                response.data as PaginatedResponse<Faculty>;
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

  ngOnInit(): void {
    this.loadFaculties();

  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.loadFaculties();
  }

  onSortChange(sort: { column: string, order: string }) {
    this.sortColumn.set(sort.column);
    this.sortDirection.set(sort.order);
    this.loadFaculties();
  }
}
