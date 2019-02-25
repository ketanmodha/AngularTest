import { HttpRequestService } from "../services/http-request.service";
import { Injectable } from "@angular/core";
declare var $:any;
declare var jQuery:any;
import * as _ from "lodash";
@Injectable()
export class CommonFunctions {
  permissions = [];
  accessReturn:boolean = false;
  role=localStorage.getItem('role');
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

  checkAccess(entity,access,baipass)
  {
    if (this.role=='superadmin') 
    {
      return true;
    }
    else
    {
      let checkMore = true;
      let checkAcc = false;
      if ( baipass != undefined && Object.keys(baipass).length > 0 ) {
        _.forEach(baipass, function(value) {
          if ( value == localStorage.getItem('role') ) {
            checkAcc = true;
          }
        });

        if (checkAcc==false) {
          checkMore =  true;
        } else {
          checkMore =  false;
        }
      }

      if ( checkMore ) {
        this.accessReturn = false;
        let that = this;

        if ( localStorage.getItem('permissions') != 'undefined' &&localStorage.getItem('permissions') != '') {
          this.permissions = JSON.parse(localStorage.getItem('permissions')); 
        }

        _.forEach(this.permissions, function(value) {
          if ( value.entity_id[0]['slug'] == entity ) {
            if ( value[access+'_data'] ) {
              that.accessReturn = true;
            }
          }
        });
        return this.accessReturn;
      } else {
        return true;
      }
    }
  }

  getAllPermissions(roleId)
  {
    this.httpRequest.doGet("permissions/" + roleId).subscribe((res: any) => 
    {
      if (roleId=='') {
        localStorage.setItem('permissions', '');
      }
      else
      {
        localStorage.setItem('permissions', JSON.stringify(res));
      }
    });
  }
}
