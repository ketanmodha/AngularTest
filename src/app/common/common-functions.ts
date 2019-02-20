import { HttpRequestService } from "../services/http-request.service";
import { Injectable } from "@angular/core";
@Injectable()
export class CommonFunctions {
  constructor(public httpRequest: HttpRequestService) {}

  getLocalStorage(storage_key) {
    return localStorage.getItem(storage_key);
  }

  getAccessCodePrefix() {
    let access_code = localStorage.getItem("access_code");
    if (access_code == "superadmin") {
      return "superadmin";
    } else {
      return "ac/" + access_code;
      // return access_code;
    }
  }
}
