import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { Observable, of, throwError, Subject } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';

import {JDMService} from '../jdm.service';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {
	
  resJson: any[];
  p: number = 1;
  total: number;
  loading: boolean;

  constructor(private activatedRoute: ActivatedRoute, private jdmService: JDMService) { }

  ngOnInit() {
   this.jdmService.getRelPageForTerm("buche", 0, 1).subscribe((res)=>{
   this.resJson = res;
   });
  }

  getPage(page: number) {
	 console.log("page before: " + this.p);
	 this.loading = true;
     this.jdmService.getRelPageForTerm("buche", 0, page).subscribe((res)=>{
	   this.resJson = res;
	   this.p = page;
	   this.loading = false;
	   console.log("page after: " + this.p);
   });
    }


}
