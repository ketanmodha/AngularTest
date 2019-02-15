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
  selector: "app-projects-manage",
  templateUrl: "./projects-manage.component.html",
  styleUrls: ["./projects-manage.component.css"]
})
export class ProjectsManageComponent implements OnInit {
  public projectForm: FormGroup;
  public users:FormArray;
  public operationText = "Add";

  public statues = [
    { option: "1", value: "Status 1" },
    { option: "2", value: "Status 2" },
    { option: "3", value: "Status 3" },
    { option: "4", value: "Status 4" }
  ];
  public userTypes = [
    { option: 1, value: "Type 1" },
    { option: 2, value: "Type 2" },
    { option: 3, value: "Type 3" }
  ];
  // public project = IProject;
  public project = {
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    status: 1,
    users: []
  };

  constructor(
    public formBuilder: FormBuilder,
    public httpRequest: HttpRequestService,
    public route: ActivatedRoute,
    private router: Router
  ) {
 
  }

  ngOnInit() {
    let id = this.route.snapshot.params["id"];
    this.initForm();
    if (id) {
      this.getProject(id);
      this.operationText = "Edit";
    } else {
      this.operationText = "Add";
    }
  }
  initForm() {
    let oldUsers = this.project.users;
    let that = this;
    let oldUser = Array();
    oldUsers.forEach(element => {
      oldUser.push(this.createUser(element));
    });
    if(oldUsers.length === 0){
      oldUser.push(this.createUser({}));
    }
    this.projectForm = this.formBuilder.group({
      name: [this.project.name, Validators.required],
      description: [this.project.description, Validators.required],
      startDate: [this.project.startDate, Validators.required],
      endDate: [this.project.endDate, Validators.required],
      status: [this.project.status, Validators.required],
      // users: this.formBuilder.array(oldUser)
      // users: this.formBuilder.array([this.createUser()])
    });
  }
  createUser(user): FormGroup {
    return this.formBuilder.group({
      name: [user.name, Validators.required],
      type: [user.type, Validators.required],
      email: [user.email, [Validators.required]],
      // _id: [user._id, []]
    });
  }
  addUser(): void {
    this.users = this.projectForm.get('users') as FormArray;
    this.users.push(this.createUser({}));
  }
  getProject(id) {
    this.httpRequest.doGet("projects/" + id).subscribe((res: any) => {
      this.project.name = res.name;
      this.project.description = res.description;
      this.project.startDate = res.startDate;
      this.project.endDate = res.endDate;
      this.project.status = res.status;
      this.project.users = res.users;
      this.initForm();
    });
  }
  projectCreate() {
    let that = this;
    let id = this.route.snapshot.params["id"];
    // console.log(this.projectForm.value);
    // return false;
    if (!id) {
      let data = this.projectForm.value;
      data.users = JSON.parse(
        '[{"name":"name4","type":2,"email":"email@email.com"},{"name":"name4","type":1,"email":"email144@email.com"}]'
      );
      this.httpRequest
        .doPostWithoutHeader("projects", this.projectForm.value)
        .subscribe(
          (data: any) => {
            that.router.navigate(["/projects"]);
          },
          (err: any) => {}
        );
    } else {
      this.httpRequest
        .doPutWithoutHeader("projects/" + id, this.projectForm.value)
        .subscribe(
          (data: any) => {
            that.router.navigate(["/projects"]);
          },
          (err: any) => {}
        );
    }
  }
}
