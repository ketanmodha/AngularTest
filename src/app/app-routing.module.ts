import { NgModule } from "@angular/core";
import {
  NoPreloading,
  PreloadAllModules,
  RouterModule,
  Routes
} from "@angular/router";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LoginComponent } from "./components/login/login.component";
import { AccessCodeGuard } from "./guards/access-code.guard";
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { RouteGuardService } from './services/route-guard.service';
const routes: Routes = [
  {
    path:"superadmin",
    children:[
      {
        path: "",
        component: LoginComponent
      },      
      {
        path: "dashboard",
        component: DashboardComponent
      },  
      {
        path: "projects",
        loadChildren: "./components/projects/projects.module#ProjectsModule",
        canActivate: [RouteGuardService],
        data: { roles: ['superadmin'] }
      },
      {
        path: "users",
        loadChildren: "./components/users/users.module#UsersModule",
        canActivate: [RouteGuardService],
        data: { roles: ['superadmin'] }
      },
      {
        path: "page-not-found",
        component: PageNotFoundComponent
      },
      {
        path:'unauthorized',
        component:UnauthorizedComponent
      },
      { path: "**", redirectTo: "page-not-found" },
    ]
  },
  {
    path: "ac/:access_code",
    // path: ":access_code",
    //canActivate: [AccessCodeGuard],
    children: [
      { path: "", component: LoginComponent },
      { path: "login", component: LoginComponent },
      { path: "dashboard",component: DashboardComponent },  
      { path: "projects", loadChildren: "./components/projects/projects.module#ProjectsModule",canActivate: [RouteGuardService],data: { baiPass: ['admin'], permissions: { projects: ['view'] } }},
      { path: "users",loadChildren: "./components/users/users.module#UsersModule",canActivate: [RouteGuardService],data: { baiPass: ['admin'], permissions: { users: ['view'] } }},
      {
        path: "page-not-found",
        component: PageNotFoundComponent
      },
      {
        path:'unauthorized',
        component:UnauthorizedComponent
      },
      { path: "**", redirectTo: "page-not-found" },
    ]
  },
  {
    path: "page-not-found",
    component: PageNotFoundComponent
  },
  {
    path:'unauthorized',
    component:UnauthorizedComponent
  },
  { path: "**", redirectTo: "page-not-found" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
