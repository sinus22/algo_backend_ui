import {Component, OnInit, signal} from '@angular/core';
import {Problem} from '@app/modules/problems/models/problem';
import {ProblemService} from '@app/modules/problems/services/problem.service';
import {NftHeaderComponent} from '@dashboard/components/nft/nft-header/nft-header.component';
import {PaginatedResponse} from '@dashboard/models/paginationResponse';
import {DatatableComponent} from '@shared/components/datatable/datatable.component';
import {ColDef} from '@dashboard/models/coldef';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-problems',
  imports: [
    NftHeaderComponent,
    DatatableComponent,
    RouterOutlet
  ],
  templateUrl: './problems.component.html',
  styleUrl: './problems.component.scss',
  standalone: true
})
export class ProblemsComponent implements OnInit{
    ngOnInit(): void {
    }

}
