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
declare var $:any;
import * as _ from "lodash";
@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnInit {

  constructor(public httpRequest: HttpRequestService,private router:Router) { }
  rolesData:any;
  entityData:any;
  permissions:any;
  ngOnInit() 
  {
  	this.entityList();
    this.rolesList();
  }

  entityList()
  {
  	this.httpRequest.doGet("entities").subscribe(res => {
      this.entityData = res;console.log(res);
    });
  }

  rolesList()
  {
    this.httpRequest.doGet("roles").subscribe(res => {
      this.rolesData = res;console.log(res);
    });
  }

  getPermisssions(role_id)
  {
    this.httpRequest.doGet("permissions/" + role_id).subscribe((res: any) => {
     this.permissions = res;
     let that = this;
        _.forEach(res, function(value) {
          $('#view_'+value["entity_id"][0]["slug"]+'_'+role_id).prop('checked', value['view_data']);
          $('#add_'+value["entity_id"][0]["slug"]+'_'+role_id).prop('checked', value['add_data']);
          $('#edit_'+value["entity_id"][0]["slug"]+'_'+role_id).prop('checked', value['edit_data']);
          $('#delete_'+value["entity_id"][0]["slug"]+'_'+role_id).prop('checked', value['delete_data']);
          $('#importexport_'+value["entity_id"][0]["slug"]+'_'+role_id).prop('checked', value['importexport_data']);
          $('#viewsetting_'+value["entity_id"][0]["slug"]+'_'+role_id).prop('checked', value['viewsetting_data']);
        });
    });
  }

  changePermission(permission,entityId,slug,roleId)
  {
    let isChecked = $('#'+permission+'_'+slug+'_'+roleId).is(':checked');
    let data = {};
    data[permission + '_data'] = isChecked;
       this.httpRequest
        .doPost("permissions",{'data': data, 'role_id': roleId, 'entity_id': entityId})
        .subscribe(
          (data: any) => {
            console.log('Permission Added.')
          },
          (err: any) => {}
        );
  }
}
