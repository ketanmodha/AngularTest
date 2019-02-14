import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
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
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  { path: '**', redirectTo: 'page-not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
