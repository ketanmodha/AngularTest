import { Injectable } from '@angular/core';
import { Router, CanActivate, Params, NavigationEnd,NavigationStart,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import * as _ from "lodash";

@Injectable({
	providedIn: 'root'
})
export class RouteGuardService {

	constructor(private router: Router) { }

	canActivate(data:ActivatedRouteSnapshot,)
	{
		if ( data.params.access_code != undefined ) 
		{
			if ( localStorage.getItem('token') ) {
				if ( data.params.access_code != localStorage.getItem('access_code') ) {
					if ( localStorage.getItem('access_code') == 'superadmin' ) {
						this.router.navigate(['/superadmin/unauthorized']);
					} else {
						this.router.navigate(['/ac/'+data.params.access_code+'/unauthorized']);
					}
					return false;
				}

			} else {
				this.router.navigate(['/ac/'+data.params.access_code]);
				return false;
			}
		}
	}
}
