import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { Observable, of, throwError, Subject } from 'rxjs';

import {JDMService} from '../jdm.service';

@Component({
  selector: 'app-term-page',
  templateUrl: './term-page.component.html',
  styleUrls: ['./term-page.component.css']
})
export class TermPageComponent implements OnInit {
  p: number[] = []; //page numerbeer for each table
  term: string;
  //resJson: any={};
  resJson: any[];
  loading: boolean;
  rels = {};
  
  constructor(private activatedRoute: ActivatedRoute, private jdmService: JDMService,  private router: Router) { }

  ngOnInit() {

   this.activatedRoute.paramMap.subscribe(
    (params: ParamMap) => {
      this.term = params.get('term');
      this.jdmService.getTerm(this.term).subscribe((res)=>{
        this.resJson = res;
        //console.log(this.resJson['rt_0']);
        //console.log(this.resJson['rts'][6]);
        for(var i = 0; i < this.resJson['rts'].length; i++){
          this.p[i] = 1;

          this.rels[this.resJson['rts'][i]['rtid']] = {"count": this.resJson['rt_'+this.resJson['rts'][i]['rtid']]['count'], "relations":this.resJson['rt_'+this.resJson['rts'][i]['rtid']]['relations']};
          
        }
        //console.log(this.rels);
        //console.log("LENGTH: " + this.rels[0].count)
      });

    }
    )
 }

public searchJDM(string){
  string = string.replace(/\s/gm,'+');
  console.log("search jdm: " + string);
  this.router.navigate(["/term", {term: string}]);
}

getPage(page: number, index: number,  rel: number) {
        //console.log(page);
        this.loading = true;
        //console.log("rel: " + rel);
        this.jdmService.getRelPageForTerm(this.term, rel, page).subscribe((res)=>
          {
            //console.log(this.rels[rel]['relations']);
            this.rels[rel]['relations'] = res ;
            //console.log(this.resJson['rt_'+rel]['relations']);
            this.p[index] = page;
            this.loading = false;
          }
        );
    }
}
