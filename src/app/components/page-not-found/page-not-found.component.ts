import { Component, OnInit } from "@angular/core";
import { HttpRequestService } from "../../services/http-request.service";
import {Router, ActivatedRoute, Params,NavigationEnd} from '@angular/router';
@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

	homeURL='/dashboard';
  constructor(
    public router:Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() 
  {

  }
}
