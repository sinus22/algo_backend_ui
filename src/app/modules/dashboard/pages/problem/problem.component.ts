import {Component, OnInit, signal} from '@angular/core';
import {NftHeaderComponent} from '../../components/nft/nft-header/nft-header.component';
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
