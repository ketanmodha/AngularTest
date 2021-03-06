import { Component, OnInit } from "@angular/core";
import { HttpRequestService } from "../../services/http-request.service";
import {Router, ActivatedRoute, Params,NavigationEnd} from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user:string;
  constructor(public router:Router) { }

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
    this.router.navigate(['/']);
  }

}
