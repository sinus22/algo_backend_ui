import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'list',
    loadComponent: () => import('@app/modules/users/pages/user-list/user-list.component').then(m => m.UserListComponent)
  },
  {
    path: 'refresh-tokens',
    loadComponent: () => import('@app/modules/users/pages/refresh-tokens/refresh-tokens.component').then(m => m.RefreshTokensComponent)
  },
  {
    path: 'universities',
    loadComponent: () => import('@app/modules/users/pages/universities/universities.component').then(m => m.UniversitiesComponent)
  }, {
    path: 'universities/create',
    loadComponent: () => import('@app/modules/users/pages/universities/university-create/university-create.component').then(m => m.UniversityCreateComponent)
  },
  {
    path: 'faculties',
    loadComponent: () => import('@app/modules/users/pages/faculties/faculties.component').then(m => m.FacultiesComponent)
  },
  {
    path: 'faculties/create',
    loadComponent: () => import('@app/modules/users/pages/faculties/faculty-create/faculty-create.component').then(m => m.FacultyCreateComponent)
  },


  {path: '', redirectTo: 'list', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
