import { Component, OnInit } from "@angular/core";
import { HttpRequestService } from "../../../services/http-request.service";
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

	public users: any;

  constructor(public httpRequest: HttpRequestService,private router:Router) { }

  ngOnInit() {
    
  	this.usersList();
  }

   usersList() 
  {
    this.httpRequest.doGet("users").subscribe(res => {
      this.users = res;
    });
    console.log(this.users);
  }

   deleteUser($event) 
   {
    let id = $event.target.id;
    let that = this;
    this.httpRequest.doDeleteWithoutHeader("users/" + id).subscribe(res => {
      that.usersList();
    });
  }

  addUser()
  {
  	this.router.navigate(['/users/create']);
  }
}
