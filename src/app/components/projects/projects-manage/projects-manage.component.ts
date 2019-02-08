import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from "@angular/forms";
import { HttpRequestService } from "src/app/services/http-request.service";
import { Route } from "@angular/compiler/src/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-projects-manage",
  templateUrl: "./projects-manage.component.html",
  styleUrls: ["./projects-manage.component.css"]
})
export class ProjectsManageComponent implements OnInit {
  public projectForm : FormGroup;
  public operationText = "Add";

  public statues = [
    { option: "1", value: "Status 1" },
    { option: "2", value: "Status 2" },
    { option: "3", value: "Status 3" },
    { option: "4", value: "Status 4" }
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
    private router: Router,
  ) {}

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
    this.projectForm = this.formBuilder.group({
      name: [this.project.name, Validators.required],
      description: [this.project.description, Validators.required],
      startDate: [this.project.startDate, Validators.required],
      endDate: [this.project.endDate, Validators.required],
      status: [this.project.status, Validators.required],
      users: []
    });
  }
  getProject(id) {
    this.httpRequest.doGet("projects/" + id).subscribe((res: any) => {
      this.project.name = res.name;
      this.project.description = res.description;
      this.project.startDate = res.startDate;
      this.project.endDate = res.endDate;
      this.project.status = res.status;
      this.initForm();
    });
  }
  projectCreate() {
    let that = this;
    let id = this.route.snapshot.params["id"];
    if (!id) {
      let data = this.projectForm.value;
      data.users = JSON.parse('[{"name":"name4","type":2,"email":"email@email.com"},{"name":"name4","type":1,"email":"email144@email.com"}]');
      this.httpRequest.doPostWithoutHeader("projects", this.projectForm.value).subscribe(
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
