import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormArray
} from "@angular/forms";
import { HttpRequestService } from "src/app/services/http-request.service";
import { Route } from "@angular/compiler/src/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EMAIL_VALIDATOR } from '@angular/forms/src/directives/validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 public loginForm: FormGroup;
 public user = {
    name: "",
    password:""
  };
  constructor(public formBuilder: FormBuilder,
    public httpRequest: HttpRequestService,
    public route: ActivatedRoute,
    private router: Router) { }

  ngOnInit( ) {
  	this.validator();
  }

  loginUser()
  {
  	 this.validator();	
  }

  validator()
  {
  	this.loginForm = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      password: [this.user.password, Validators.required],
    });
  }

}
