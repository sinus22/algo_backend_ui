import {Component, OnInit, signal} from '@angular/core';
import {ContestService} from '@app/modules/contests/services/contest.service';
import {Contest} from '@app/modules/contests/models/contest';
import {ColDef} from '@dashboard/models/coldef';
import {PaginatedResponse} from '@dashboard/models/paginationResponse';
import {NftHeaderComponent} from '@dashboard/components/nft/nft-header/nft-header.component';
import {DatatableComponent} from '@shared/components/datatable/datatable.component';

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
export class ContestListComponent implements OnInit{
  constructor(private contestService: ContestService) {
  }

  contests = signal<Contest[]>([]);
  totalItems = signal<number>(0);
  totalPages = signal<number>(0);
  currentPage = signal<number>(1);
  pageSize = signal<number>(10);
  sortColumn = signal<string>('id');
  sortDirection = signal<string>('desc');
  hasPreviousPage = signal<boolean>(true);
  hasNextPage = signal<boolean>(true);
  columns: ColDef[] = [
    {label: 'Id', key: 'id',sortable: true},
    {label: 'Title', key: 'title', sortable: true},
    {label: 'Boshlanish vaqti', key: 'startDate', sortable: true, format: (value: any) =>
        new Date(value).toLocaleString()},
    {label: 'Davomiylik', key: 'duration', sortable: true},
    {label: 'Type', key: 'type', sortable: true},
    {label: 'Status', key: 'status', sortable: true},
  ];


  ngOnInit() {
    this.loadContests();
  }

  loadContests(): void {
    this.contestService
      .getContests(this.currentPage(), this.pageSize(), this.sortColumn(), this.sortDirection())
      .subscribe({
          next: (response) => {

            if (response.success) {
              console.log(response.data);
              const {items, totalItems, totalPages, page, pageSize, hasPreviousPage, hasNextPage} =
                response.data as PaginatedResponse<Contest>;
              this.contests.set(items);
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

  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.loadContests();
  }

  onSortChange(sort: { column: string, order: string }) {
    this.sortColumn.set(sort.column);
    this.sortDirection.set(sort.order);
    this.loadContests();
  }
}
