import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { NftComponent } from './pages/nft/nft.component';
import {UsersComponent} from './pages/users/users.component';
import {ProblemComponent} from './pages/problem/problem.component';
import {ContestComponent} from '@dashboard/pages/contest/contest.component';
import {DashboardUrls} from '@dashboard/dashboard-urls';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: DashboardUrls.Home, redirectTo: 'users', pathMatch: 'full' },
      { path: DashboardUrls.Nfts, component: NftComponent },
      { path: DashboardUrls.Users, component: UsersComponent },
      { path: DashboardUrls.Problems, component: ProblemComponent },
      { path: DashboardUrls.Contests, component: ContestComponent },
      { path: '**', redirectTo: 'errors/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
