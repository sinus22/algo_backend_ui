import {Component, OnInit, signal} from '@angular/core';
import {NftHeaderComponent} from '../../components/nft/nft-header/nft-header.component';
import {NftDualCardComponent} from '../../components/nft/nft-dual-card/nft-dual-card.component';
import {NftSingleCardComponent} from '../../components/nft/nft-single-card/nft-single-card.component';
import {NftChartCardComponent} from '../../components/nft/nft-chart-card/nft-chart-card.component';
import {NftAuctionsTableComponent} from '../../components/nft/nft-auctions-table/nft-auctions-table.component';
import {TableHeaderComponent} from '../../../uikit/pages/table/components/table-header/table-header.component';
import {TableRowComponent} from '../../../uikit/pages/table/components/table-row/table-row.component';
import {TableActionComponent} from '../../../uikit/pages/table/components/table-action/table-action.component';
import {ProblemService} from '../../service/problem.service';
import {Problem} from '../../models/problem';

@Component({
  selector: 'app-problem',
  imports: [
    NftHeaderComponent,
    // NftDualCardComponent,
    // NftSingleCardComponent,
    // NftChartCardComponent,
    // NftAuctionsTableComponent,
    // TableHeaderComponent,
    // TableRowComponent,
    // TableActionComponent,
  ],
  templateUrl: './problem.component.html',
  standalone: true,
})
export class ProblemComponent implements OnInit {
  problems = signal<Problem[]>([]);
  // users: User[] = [];
  totalItems: number = 0;
  totalPages: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 10
  constructor(private problemService: ProblemService)  {
  }
  loadProblem(page: number, perPage: number) {
    this.problemService.getProblems(page, perPage).subscribe({
      next: (response) => {
        this.problems.set(response.items)
        this.totalItems = response.totalItems;
        this.totalPages = response.totalPages;
        this.currentPage = response.page;
        this.itemsPerPage = response.pageSize;
      }
    })
  }
  ngOnInit() {
    this.loadProblem(1, 20);
  }
}
