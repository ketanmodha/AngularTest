import { Injectable } from '@angular/core';
import { Router, CanActivate, Params, NavigationEnd,NavigationStart,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import * as _ from "lodash";

@Injectable({
	providedIn: 'root'
})
export class RouteGuardService {

	permissions = [];
	checkMore:boolean = true;
	access = [];
	roles = [];
	allowRoles = [];
	baiPass = [];
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

		if (localStorage.getItem('token')) {
			if ( localStorage.getItem('permissions') != 'undefined' && localStorage.getItem('permissions') != '') {
				this.permissions = JSON.parse(localStorage.getItem('permissions')); 
			}
			this.checkMore = true;

			return this.checkAccessDetail(data);
		} 
		else 
		{
			this.router.navigate(['/superadmin']);
			return false;
		}
	}

	checkAccessDetail(data)
	{
		this.allowRoles = data.data.allowRoles as Array<string>;
		this.baiPass = data.data.baiPass as Array<string>;
		this.roles = data.data.roles as Array<string>;
		this.access = data.data.permissions as Array<string>;

		if ( this.allowRoles != undefined && Object.keys(this.allowRoles).length > 0 ) 
		{
			let that = this;
			let checkAcc1 = false;
			_.forEach(this.allowRoles, function(value) {
				if ( value == localStorage.getItem('role') ) {
					checkAcc1 = true;
				}
			});

			if ( !checkAcc1 ) {
				that.router.navigate(['unauthorized']);
				return false;
			} else {
				this.checkMore =  true;
			}

		} else if ( this.baiPass != undefined && Object.keys(this.baiPass).length > 0 ) {
			let that = this;
			let checkAcc3 = false;
			_.forEach(this.baiPass, function(value) {
				if ( value == localStorage.getItem('role') ) {
					checkAcc3 = true;
				}
			});

			if ( !checkAcc3 ) {
				this.checkMore =  true;
			} else {
				this.checkMore =  false;
			}

		} else if ( this.roles != undefined && Object.keys(this.roles).length > 0 ) {
			let that = this;
			let checkAcc2 = false;
			_.forEach(this.roles, function(value) {
				if ( value == localStorage.getItem('role') ) {
					checkAcc2 = true;
				}
			});

			if ( !checkAcc2 ) {

				this.router.navigate(['unauthorized']);
				return false;
			} else {

				this.checkMore = false;
				return true;
			}
		}

		if( this.checkMore && this.permissions && this.access != undefined && Object.keys(this.access).length > 0 ){
			let that = this;
			let checkAcc = false;
			_.forEach(this.permissions, function(value) {
				_.forEach(that.access, function(val, key) {
					value.slug=value['entity_id'][0]['slug'];
					if ( value.slug == key ) {
						_.forEach(val, function(acce) {
							if ( value[acce+'_data'] ) {
								checkAcc = true;
							}
						});
					}
				});
			});
			if ( checkAcc ) {
				return true;
			} else {
				this.router.navigate(['unauthorized']);
				return false;
			}
		}
		return true;
	}
}

