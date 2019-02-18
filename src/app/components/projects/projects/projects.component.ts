import { Component, OnInit } from "@angular/core";
import { HttpRequestService } from "../../../services/http-request.service";
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.css"]
})
export class ProjectsComponent implements OnInit {
  public projects: any;
  constructor(public httpRequest: HttpRequestService,private router: Router) {}

  ngOnInit() {
    this.getProjects();
  }
  
  getProjects() 
  {
    this.httpRequest.doGet("projects").subscribe(res => {
      console.log(res);
      this.projects = res;
    });
  }

  deleteProject($event) {
    let id = $event.target.id;
    let that = this;
    this.httpRequest.doDeleteWithoutHeader("projects/" + id).subscribe(res => {
      console.log(res);
      that.getProjects();
    });
  }
}
