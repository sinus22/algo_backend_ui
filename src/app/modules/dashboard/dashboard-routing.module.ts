import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { NftComponent } from './pages/nft/nft.component';
import {DashboardUrls} from '@dashboard/dashboard-urls';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: DashboardUrls.Nfts, component: NftComponent },

      // { path: DashboardUrls.Users, component: UsersComponent },


      { path: '**', redirectTo: 'errors/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
