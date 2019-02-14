import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'projects',
    loadChildren: './components/projects/projects.module#ProjectsModule'
  },
  {
    path: 'users',
    loadChildren: './components/users/users.module#UsersModule'
  },
  {
    path:'page-not-found',
    component:PageNotFoundComponent
  },
  { path: '**', redirectTo: 'page-not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
