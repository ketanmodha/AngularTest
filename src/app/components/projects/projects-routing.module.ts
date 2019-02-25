import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectsManageComponent } from './projects-manage/projects-manage.component';
import { RouteGuardService } from './../../services/route-guard.service';

const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent
  },
  {
    path: 'create',
    component: ProjectsManageComponent,
    canActivate: [RouteGuardService],
    data: { baiPass: ['admin','superadmin'],
    permissions: { projects: ['create'] } }
  },
  {
    path: 'create/:id',
    component: ProjectsManageComponent,
    canActivate: [RouteGuardService],
    data: { baiPass: ['admin','superadmin'],
    permissions: { projects: ['edit'] } }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
