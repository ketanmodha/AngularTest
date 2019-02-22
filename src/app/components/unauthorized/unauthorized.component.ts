import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params,NavigationEnd} from '@angular/router';
import { CommonFunctions } from './../../common/common-functions';
@Component({
	selector: 'app-unauthorized',
	templateUrl: './unauthorized.component.html',
	styleUrls: ['./unauthorized.component.css']
})
export class UnauthorizedComponent implements OnInit {

	role = localStorage.getItem('role');
	public isSuperAdmin:boolean;
	constructor(public commonFunctions:CommonFunctions,
		public router:Router,
		private activatedRoute: ActivatedRoute) 
	{
		this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {   
				this.isSuperAdmin = (event.url.indexOf('superadmin') !== -1);
			}      
		});
	}

	ngOnInit() 
	{
		
	}

}
