import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { RolesComponent } from './roles/roles.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { RouteGuardService } from './../../services/route-guard.service';
const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  },
  {
    path: 'create',
    component: CreateUserComponent,
    canActivate: [RouteGuardService],
    data: { baiPass: ['admin','superadmin'],
    permissions: { users: ['add'] } }
  },
  {
    path: 'roles',
    component: RolesComponent,
    canActivate: [RouteGuardService],
    data: { baiPass: ['admin','superadmin'],
    permissions: { roles: ['view'] } }
  },
  {
    path: 'permissions',
    component: PermissionsComponent,
    canActivate: [RouteGuardService],
    data: { baiPass: ['admin','superadmin'],
    permissions: { permissions: ['view'] } }
  },
  {
    path: 'create/:id',
    component: CreateUserComponent,
    canActivate: [RouteGuardService],
    data: { baiPass: ['admin','superadmin'],
    permissions: { users: ['edit'] } }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
