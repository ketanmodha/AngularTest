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
    first_name: "",
    password:""
  };
  constructor(public formBuilder: FormBuilder,
    public httpRequest: HttpRequestService,
    public route: ActivatedRoute,
    private router: Router) { }

  ngOnInit( ) {
    if (localStorage.getItem('isLogin')=='true') {
      this.router.navigate(['/dashboard']);
    }
  	this.validator();
  }

  loginUser()
  {
  	 let that=this;
  	  this.httpRequest
        .doPostWithoutHeader("users/login", this.loginForm.value)
        .subscribe(
          (data: any) => {
          	if (data.message=='fail') 
          	{
          		alert('Login Failed');
          	}
          	else
          	{
          		let logindata = this.loginForm.value;
          		localStorage.setItem('user',logindata.first_name);
	  	 		    localStorage.setItem('isLogin','true');
	            that.router.navigate(["/dashboard"]);
          	}
          },
          (err: any) => {}
        );
  }

  validator()
  {
  	this.loginForm = this.formBuilder.group({
      first_name: [this.user.first_name, Validators.required],
    });
  }

}
