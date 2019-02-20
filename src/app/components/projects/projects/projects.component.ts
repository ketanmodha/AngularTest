import { Component, OnInit } from "@angular/core";
import { HttpRequestService } from "../../../services/http-request.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { CommonFunctions } from "src/app/common/common-functions";
@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.css"]
})
export class ProjectsComponent implements OnInit {
  public projects: any;
  constructor(
    public httpRequest: HttpRequestService,
    private router: Router,
    public commonFunctions: CommonFunctions
  ) {}

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this.httpRequest.doGet("projects").subscribe(res => {
      this.projects = res;
    });
  }

  deleteProject($event) {
    let id = $event.target.id;
    let that = this;
    this.httpRequest.doDelete("projects/" + id).subscribe(res => {
      console.log(res);
      that.getProjects();
    });
  }
}
