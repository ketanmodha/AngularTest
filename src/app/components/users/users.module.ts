import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UsersRoutingModule } from "./users-routing.module";
import { HttpRequestService } from "src/app/services/http-request.service";
import {
  MatDatepickerModule,
  MatNativeDateModule,
  MatInputModule,
  MatFormFieldModule,
  MatCardModule,
  MATERIAL_SANITY_CHECKS
} from "@angular/material";
import { UsersComponent } from './users/users.component';
import { CreateUserComponent } from './create-user/create-user.component';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatDatepickerModule,

    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule
  ],
  declarations: [UsersComponent, CreateUserComponent],
  providers: [
    {
      provide: MATERIAL_SANITY_CHECKS,
      useValue: false
    }
  ]
})
export class UsersModule {}
