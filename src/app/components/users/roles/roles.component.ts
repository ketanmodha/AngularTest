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
	selector: 'app-roles',
	templateUrl: './roles.component.html',
	styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

	public roleForm: FormGroup;
	public role = {
		name: "",
		slug:"",
	};
	public roles: any;
	entity:string='Roles';
	hideRoles:boolean=false;
	constructor( public formBuilder: FormBuilder,
		public httpRequest: HttpRequestService,
		public route: ActivatedRoute,
		private router: Router) { }

	ngOnInit() {
		this.rolesList();
		this.validator();
	}

	validator()
	{
		this.roleForm = this.formBuilder.group({
			name: [this.role.name, Validators.required],
		});
	}

	onSubmit()
	{
		if (!this.role['_id']) 
		{
			let that=this;
			let data = this.roleForm.value;
		    data.entities = JSON.parse(
		        '[{"name":"Projects","slug":"projects"},{"name":"Users","slug":"users"}]'
		      );
			this.roleForm.value['slug']=this.roleForm.value['name'].toLowerCase();
			this.httpRequest
			.doPostWithoutHeader("roles", this.roleForm.value)
			.subscribe(
				(data: any) => {
					if (data.message=='fail') 
					{
						alert('Unsuccesfull.');
					}
					else
					{
						this.hideRoles=false;
						this.rolesList();
					}
				},
				(err: any) => {}
				);
		}
		else
		{
			this.roleForm.value['slug']=this.roleForm.value['name'].toLowerCase();
			this.httpRequest
			.doPutWithoutHeader("roles/" +this.role['_id'], this.roleForm.value)
			.subscribe(
				(data: any) => {
					this.hideRoles=false;
					this.rolesList();
					this.entity='Roles';
				},
				(err: any) => {}
				);
		}
		
	}

	rolesList() 
	{
		this.httpRequest.doGet("roles").subscribe(res => {
			this.roles = res;
		});
		console.log(this.roles);
	}

	deleteRole($event) 
	{
		let id = $event.target.id;
		let that = this;
		this.httpRequest.doDeleteWithoutHeader("roles/" + id).subscribe(res => {
			that.rolesList();
		});
	}

	addRole()
	{
		this.role = {
			name: "",
			slug:""
		};
		this.entity='Create Role';
		this.hideRoles=true;
	}

	cancel()
	{
		this.hideRoles=false;
		this.entity='Roles';
	}

	editRole(row)
	{
		this.role = {
			name: "",
			slug:"",

		};
		this.entity='Edit Role';
		this.hideRoles=true;
		this.role=row;
	}
}
