import {
  Component,
  OnInit,
  Input,
  HostBinding,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  AfterViewInit
} from "@angular/core";
import { Router, NavigationEnd, ActivatedRoute, Params } from "@angular/router";
import { CommonFunctions } from "./common/common-functions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  public isLogin: boolean = false;
  title = "pms-demo-client";
  public roleId=localStorage.getItem('role_id');
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public commonFunctions: CommonFunctions
  ) {
    let that = this;

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (
          localStorage.getItem("isLogin") == "true" &&
          localStorage.getItem("token") !== ""
        ) {
          that.isLogin = true;
        } else {
          that.isLogin = false;
        }
      }
    });
  }
  ngOnInit() {
    this.commonFunctions.getAllPermissions(this.roleId);
  }
}
