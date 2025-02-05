import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'list',
    loadComponent: () => import('@app/modules/contests/pages/contest-list/contest-list.component').then(m => m.ContestListComponent)
  },
  {
    path: 'standings',
    loadComponent: () => import('@app/modules/contests/pages/contest-standings/contest-standings.component').then(m => m.ContestStandingsComponent)
  },
  {
    path: 'problems',
    loadComponent: () => import('@app/modules/contests/pages/contest-problems/contest-problems.component').then(m => m.ContestProblemsComponent)
  },

  {path: '', redirectTo: 'list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContestsRoutingModule {
}
