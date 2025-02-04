import {Component, OnInit, signal} from '@angular/core';
import {NftHeaderComponent} from '@dashboard/components/nft/nft-header/nft-header.component';
import {User} from '@dashboard/models/user';
import {UserService} from '@dashboard/service/user.service';
import {DatatableComponent} from '@shared/components/datatable/datatable.component';
import {PaginatedResponse} from '@dashboard/models/paginationResponse';
import {ColDef} from '@dashboard/models/coldef';
import {RouterOutlet} from '@angular/router';
@Component({
  selector: 'app-users',
  imports: [
    RouterOutlet,
  ],
  templateUrl: './users.component.html',
  standalone: true,
})

export class UsersComponent implements OnInit {
    ngOnInit(): void {
    }


}
