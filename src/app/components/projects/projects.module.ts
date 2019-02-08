import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProjectsRoutingModule } from "./projects-routing.module";
import { ProjectsComponent } from "./projects/projects.component";
import { HttpRequestService } from "src/app/services/http-request.service";
import { ProjectsManageComponent } from "./projects-manage/projects-manage.component";
import {
  MatDatepickerModule,
  MatNativeDateModule,
  MatInputModule,
  MatFormFieldModule,
  MatCardModule,
  MATERIAL_SANITY_CHECKS
} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    MatDatepickerModule,

    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule
  ],
  declarations: [ProjectsComponent, ProjectsManageComponent],
  providers: [
    {
      provide: MATERIAL_SANITY_CHECKS,
      useValue: false
    }
  ]
})
export class ProjectsModule {}
