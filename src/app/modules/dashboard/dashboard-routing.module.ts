import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { NftComponent } from './pages/nft/nft.component';
import {UsersComponent} from './pages/users/users.component';
import {ContestComponent} from '@dashboard/pages/contest/contest.component';
import {DashboardUrls} from '@dashboard/dashboard-urls';
import {ProblemsComponent} from '@dashboard/pages/problems/problems.component';
import {ProblemCreateComponent} from '@dashboard/pages/problems/problem-create/problem-create.component';
import {CreateUserComponent} from '@dashboard/pages/users/create-user/create-user.component';
import {CreateContestComponent} from '@dashboard/pages/contest/create-contest/create-contest.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: DashboardUrls.Home, redirectTo: 'users', pathMatch: 'full' },
      { path: DashboardUrls.Nfts, component: NftComponent },

      { path: DashboardUrls.Users, component: UsersComponent },
      { path: DashboardUrls.UserCreate, component: CreateUserComponent },

      { path: DashboardUrls.Problems, component: ProblemsComponent},
      { path: DashboardUrls.ProblemCreate, component: ProblemCreateComponent},

      { path: DashboardUrls.Contests, component: ContestComponent },
      { path: DashboardUrls.ContestCreate, component: CreateContestComponent },

      { path: '**', redirectTo: 'errors/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
