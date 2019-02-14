import { Component, OnInit } from '@angular/core';
import { NgForm,FormBuilder,FormGroup,Validators,ReactiveFormsModule,FormArray } from '@angular/forms';
import { Route } from "@angular/compiler/src/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpRequestService } from "src/app/services/http-request.service";
@Component({
	selector: 'app-create-user',
	templateUrl: './create-user.component.html',
	styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
	public userForm: FormGroup;
	mode:string='Create';
	public users = {
		first_name: "",
		last_name: "",
		phone: "",
		status: 1,
	};
	public status = [
	{ option: 0, value: "Inactive" },
	{ option: 1, value: "Active" },
	];
	constructor( public formBuilder: FormBuilder,
		public httpRequest: HttpRequestService,
		public route: ActivatedRoute,
		private router: Router) 
	{

	}

	ngOnInit() 
	{
		let id = this.route.snapshot.params["id"];
		this.validator();
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
      this.users.last_name = res.last_name;
      this.users.last_name = res.last_name;
      this.users.phone = res.phone;
      this.users.status = res.status;
      this.validator();
    });
  }

  validator() {
    this.userForm = this.formBuilder.group({
      first_name: [this.users.first_name, Validators.required],
      last_name: [this.users.last_name, Validators.required],
      phone: [this.users.phone, Validators.required],
      status: [this.users.status, Validators.required],
    });
  }

   onSubmit() {
    let that = this;
    let id = this.route.snapshot.params["id"];
    if (!id) {
      console.log(id);
      // let data = this.userForm.value;
      //  data.users = JSON.parse(
      //   '[{"first_name":"TEST","last_name":"TEST","phone":"1234567899"}]'
      // );
      
      this.httpRequest
        .doPostWithoutHeader("users", this.userForm.value)
        .subscribe(
          (data: any) => {
            that.router.navigate(["/users"]);
          },
          (err: any) => {}
        );
    } else {
      this.httpRequest
        .doPutWithoutHeader("users/" + id, this.userForm.value)
        .subscribe(
          (data: any) => {
            that.router.navigate(["/users"]);
          },
          (err: any) => {}
        );
    }
  }
  
}
