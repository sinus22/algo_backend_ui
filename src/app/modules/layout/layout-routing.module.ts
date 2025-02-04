import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: LayoutComponent,
    loadChildren: () => import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'users',
    component: LayoutComponent,
    loadChildren: () => import('../users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'contests',
    component: LayoutComponent,
    loadChildren: () => import('../contests/contests.module').then((m) => m.ContestsModule),
  },
  {
    path: 'problems',
    component: LayoutComponent,
    loadChildren: () => import('../problems/problems.module').then((m) => m.ProblemsModule),
  },
  {
    path: 'submissions',
    component: LayoutComponent,
    loadChildren: () => import('../submissions/submissions.module').then((m) => m.SubmissionsModule),
  },




  {
    path: 'components',
    component: LayoutComponent,
    loadChildren: () => import('../uikit/uikit.module').then((m) => m.UikitModule),
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
