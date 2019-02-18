import { Component,OnInit,Input, HostBinding, ViewChild, ElementRef,Output,EventEmitter,AfterViewInit} from '@angular/core';
import { Router,NavigationEnd, ActivatedRoute,Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
public isLogin:boolean=false;  
  title = 'pms-demo-client';

   constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    ) 
   {
   		this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) 
      {       
     	if (localStorage.getItem('isLogin')!='true') 
     	{
        this.router.navigate(['/']);
     		this.isLogin=true;
     	}
      }      
    });
   }
}
