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
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { EMAIL_VALIDATOR } from "@angular/forms/src/directives/validators";
import { CommonFunctions } from "src/app/common/common-functions";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  public isSuperAdmin = false;
  public loginForm: FormGroup;
  public user = {
    first_name: "",
    access_code: ""
  };
  constructor(
    public formBuilder: FormBuilder,
    public httpRequest: HttpRequestService,
    public route: ActivatedRoute,
    private router: Router,
    public commonFunctions: CommonFunctions
  ) {}

  ngOnInit() {
    let that = this;
    that.validator();

    this.route.params.subscribe(params => {
      if (this.router.url.indexOf("superadmin") !== -1) {
        localStorage.setItem("access_code", "superadmin");
        this.loginForm.value.isSuperAdmin = this.isSuperAdmin;
      } else {
        localStorage.setItem(
          "access_code",
          this.route.snapshot.params["access_code"]
        );
      }
      if (event instanceof NavigationEnd) {
        this.isSuperAdmin = event.url.indexOf("superadmin") !== -1;
        localStorage.setItem("access_code", "superadmin");
      }

      if (localStorage.getItem("isLogin") == "true") {
        let prefix = that.commonFunctions.getAccessCodePrefix();
        that.router.navigate([prefix + "/dashboard"]);
      }
    });
  }

  loginUser() {
    let that = this;
    this.httpRequest
      .doPost("login", this.loginForm.value, {
        "Content-Type": "application/json",
        AccessCode: localStorage.getItem("access_code")
      })
      .subscribe(
        (data: any) => {
          if (data.message == "fail") {
            alert("Login Failed");
          } else {
            let logindata = this.loginForm.value;
            localStorage.setItem("user", logindata.first_name);
            localStorage.setItem("token", localStorage.getItem("access_code"));
            localStorage.setItem("isLogin", "true");
            that.router.navigate([
              that.commonFunctions.getAccessCodePrefix() + "/dashboard"
            ]);
          }
        },
        (err: any) => {}
      );
  }

  validator() {
    this.loginForm = this.formBuilder.group({
      first_name: [this.user.first_name, Validators.required],
      access_code: [""]
    });
  }
}
