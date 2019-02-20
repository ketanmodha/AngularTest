import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  ActivatedRoute,
  Router,
  NavigationEnd
} from "@angular/router";
import { Observable } from "rxjs";
import { CommonFunctions } from "../common/common-functions";

@Injectable({
  providedIn: "root"
})
export class AccessCodeGuard {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public commonFunctions: CommonFunctions
  ) {}
  canActivate() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (
          !event.url.includes(
            this.commonFunctions.getLocalStorage("access_code")
          ) &&
          this.commonFunctions.getLocalStorage("token") !== ""
        ) {
          return this.router.navigate([
            this.commonFunctions.getAccessCodePrefix() + "/dashboard"
          ]);
        }
      }
    });
    return true;
  }
}
