import {Component, OnInit, signal, ViewChild} from '@angular/core';
import {ContestService} from '@dashboard/service/contest.service';
import {DatatableComponent} from '@shared/components/datatable/datatable.component';
import {NftHeaderComponent} from '@dashboard/components/nft/nft-header/nft-header.component';
import {PaginatedResponse} from '@dashboard/models/paginationResponse';
import {Contest} from '@dashboard/models/contest';
import {ColDef} from '@dashboard/models/coldef';

@Component({
  selector: 'app-contest',
  imports: [
    // DatatableComponent,
    NftHeaderComponent,
    DatatableComponent,
  ],
  standalone: true,
  templateUrl: './contest.component.html',
  styleUrl: './contest.component.scss'
})
export class ContestComponent implements OnInit {
  // @ViewChild('agGrid') agGrid: AgGridAngular
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

  // Column Definitions: Defines the columns to be displayed.
  // colDefs: ColDef[] = [
  //   {field: "make", flex: 2},
  //   {field: "model",flex: 2 },
  //   {field: "price", flex: 2},
  //   {field: "electric", flex: 2}
  // ];
  // colDef: ColDef[] = [
  //   {field: "id"},
  //   {field: "title"},
  //   {field: "startDate"},
  //   {field: "duration"},
  //   {field: "type"},
  //   {field: "status"}
  // ]

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
