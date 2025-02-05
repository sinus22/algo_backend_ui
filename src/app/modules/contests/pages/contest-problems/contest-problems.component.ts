import {Component, OnInit, signal} from '@angular/core';
import {ContestService} from '@app/modules/contests/services/contest.service';
import {ContestStanding} from '@app/modules/contests/models/contest-standing';
import {ColDef} from '@dashboard/models/coldef';
import {PaginatedResponse} from '@dashboard/models/paginationResponse';
import {ContestProblem} from '@app/modules/contests/models/contest-problem';
import {NftHeaderComponent} from '@dashboard/components/nft/nft-header/nft-header.component';
import {DatatableComponent} from '@shared/components/datatable/datatable.component';

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
export class ContestProblemsComponent implements OnInit{
  constructor(private contestService: ContestService) {
  }

  contests = signal<ContestProblem[]>([]);
  totalItems = signal<number>(0);
  totalPages = signal<number>(0);
  currentPage = signal<number>(1);
  pageSize = signal<number>(20);
  sortColumn = signal<string>('id');
  sortDirection = signal<string>('desc');
  hasPreviousPage = signal<boolean>(true);
  hasNextPage = signal<boolean>(true);
  columns: ColDef[] = [
    {label: 'Id', key: 'id',sortable: true},
    {label: 'Contest Id', key: 'contestId', sortable: true},
    {label: 'Problem id', key: 'problemId', sortable: true},
    {label: 'Definition', key: 'definition', sortable: true},
    {label: 'Created at', key: 'createdAt', sortable: true, format: (value: any) =>
        new Date(value).toLocaleString()},
    {label: 'Updated at', key: 'updatedAt', sortable: true, format: (value: any) =>
        new Date(value).toLocaleString()},

  ];


  ngOnInit() {
    this.loadContestProblems();
  }

  loadContestProblems(): void {
    this.contestService
      .getContestProblems(this.currentPage(), this.pageSize(), this.sortColumn(), this.sortDirection())
      .subscribe({
          next: (response) => {

            if (response.success) {
              console.log(response.data);
              const {items, totalItems, totalPages, page, pageSize, hasPreviousPage, hasNextPage} =
                response.data as PaginatedResponse<ContestProblem>;
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
    this.loadContestProblems();
  }

  onSortChange(sort: { column: string, order: string }) {
    this.sortColumn.set(sort.column);
    this.sortDirection.set(sort.order);
    this.loadContestProblems();
  }
}
