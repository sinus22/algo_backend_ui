import {Component, effect, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {RefreshToken} from '@app/modules/users/models/refresh-token';
import {ColDef} from '@dashboard/models/coldef';
import {UserService} from '@app/modules/users/services/user.service';
import {PaginatedResponse} from '@dashboard/models/paginationResponse';
import {University} from '@app/modules/users/models/university';
import {NftHeaderComponent} from '@dashboard/components/nft/nft-header/nft-header.component';
import {DatatableComponent} from '@shared/components/datatable/datatable.component';
import {BaseTableComponent} from '@app/core/base/base-table-component';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-universities',
  imports: [
    NftHeaderComponent,
    DatatableComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './universities.component.html',
  standalone: true,
  styleUrl: './universities.component.scss'
})
export class UniversitiesComponent extends BaseTableComponent<University> {

  private userService = inject(UserService);
  filters: WritableSignal<{ [key: string]: string | number | boolean | null; }> = signal({});

  constructor() {
    super();
    effect(() => {
      this.fetchData();
    });
  }

  columns: ColDef[] = [
    {label: 'Id', key: 'id', sortable: true, filterable: true},
    {label: 'Name', key: 'name', sortable: true, filterable: true},
    {label: 'Status', key: 'status', sortable: true, filterable: true},
    {
      label: 'Created At', key: 'createdAt', sortable: true,
      filterable: true, type: 'date',
      format: (value: any) =>
        new Date(value).toLocaleString()
    },
    {
      label: 'Updated At', key: 'updatedAt', sortable: true,
      // filterable: true,type:'date',
      format: (value: any) =>
        new Date(value).toLocaleString()
    },
  ]


  fetchData(): void {
    this.userService
      .getUniversities({
        page: this.currentPage(),
        pageSize: this.pageSize(),
        sort: this.sortColumn(),
        order: this.sortDirection(),
        filters: this.filters(),
      })
      .subscribe({
          next: (response) => {

            if (response.success) {
              const {items, totalItems, totalPages, page, pageSize, hasPreviousPage, hasNextPage} =
                response.data as PaginatedResponse<University>;
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

  onFilterChange(column: string, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.filters.set({...this.filters(), [column]: inputElement.value});
  }

  /**
   * 🛠 **Date Range Filtering**
   */
  onDateFilterChange(column: string, type: 'from' | 'to', event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const date = new Date(inputElement.value);
    console.log(date);
    const filterKey = `${column}${type === 'from' ? 'From' : 'To'}`;
    this.filters.set({...this.filters(), [filterKey]: date.toISOString()});
  }

}
