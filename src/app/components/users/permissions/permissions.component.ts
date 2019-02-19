import { Component, OnInit } from "@angular/core";
import { HttpRequestService } from "../../../services/http-request.service";
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnInit {

  constructor(public httpRequest: HttpRequestService,private router:Router) { }
  entityData:any;
  ngOnInit() 
  {
  	this.entityList();
  }

  entityList()
  {
  	this.httpRequest.doGet("permissions").subscribe(res => {
      /*this.entityData = res;*/console.log(res);
    });
  }

  rolesList()
  {

  }
}
