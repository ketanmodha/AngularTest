import { Component, OnInit } from "@angular/core";
import { HttpRequestService } from "../../services/http-request.service";
import {Router, ActivatedRoute, Params,NavigationEnd} from '@angular/router';
import { CommonFunctions } from 'src/app/common/common-functions';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user:string;
  constructor(public router:Router,public commonFunctions:CommonFunctions) { }

  ngOnInit() {
  	if (localStorage.getItem('isLogin')=='true') 
    {  
      this.user=localStorage.getItem('user');
    }
  }

  logout()
  {
    localStorage.setItem('user','');
    localStorage.setItem('isLogin','');
    localStorage.setItem('token','');
    localStorage.setItem('role_id','');
    this.router.navigate([this.commonFunctions.getAccessCodePrefix() + '/']);
  }

}
