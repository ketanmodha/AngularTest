import { Component, OnInit } from "@angular/core";
import {
  NgForm,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormArray
} from "@angular/forms";
import { Route } from "@angular/compiler/src/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpRequestService } from "src/app/services/http-request.service";
import { CommonFunctions } from "src/app/common/common-functions";
@Component({
  selector: "app-create-user",
  templateUrl: "./create-user.component.html",
  styleUrls: ["./create-user.component.css"]
})
export class CreateUserComponent implements OnInit {
  public userForm: FormGroup;
  mode: string = "Create";
  public users = {
    role_id:'',
    first_name: "",
    last_name: "",
    phone: "",
    status: 1
  };
  public status = [
    { option: 0, value: "Inactive" },
    { option: 1, value: "Active" }
  ];
  public roles:any;
  constructor(
    public formBuilder: FormBuilder,
    public httpRequest: HttpRequestService,
    public route: ActivatedRoute,
    private router: Router,
    public commonFunctions: CommonFunctions
  ) {}

  ngOnInit() {
    let id = this.route.snapshot.params["id"];
    this.validator();
    this.rolesList();
    if (id) {
      this.usersList(id);
      this.mode = "Edit";
    } else {
      this.mode = "Create";
    }
  }

  usersList(id) {
    this.httpRequest.doGet("users/" + id).subscribe((res: any) => {
      this.users.first_name = res.first_name;
      this.users.role_id = res.role_id;
      this.users.last_name = res.last_name;
      this.users.phone = res.phone;
      this.users.status = res.status;
      this.validator();
    });
  }

  validator() {
    this.userForm = this.formBuilder.group({
      role_id: [this.users.role_id, Validators.required],
      first_name: [this.users.first_name, Validators.required],
      last_name: [this.users.last_name, Validators.required],
      phone: [this.users.phone, Validators.required],
      status: [this.users.status, Validators.required]
    });
  }

  onSubmit() {
    let that = this;
    let id = this.route.snapshot.params["id"];
    if (!id) {
      console.log(id);
    

      this.httpRequest.doPost("users", this.userForm.value).subscribe(
        (data: any) => {
          that.router.navigate([
            that.commonFunctions.getAccessCodePrefix() + "/users"
          ]);
        },
        (err: any) => {}
      );
    } else {
      this.httpRequest.doPut("users/" + id, this.userForm.value).subscribe(
        (data: any) => {
          that.router.navigate([
            that.commonFunctions.getAccessCodePrefix() + "/users"
          ]);
        },
        (err: any) => {}
      );
    }
  }

  rolesList()
  {
    this.httpRequest.doGet("roles").subscribe(res => {
      this.roles = res;
      console.log(res);
    });
  }
}
