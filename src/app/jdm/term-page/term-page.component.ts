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
  defsPage: number;
  term: string;
  public displayTerm: string;
  resJson: any[];
  public sortOptions: string;
  loading: boolean;
  pageLoading: boolean;
  rels = {};
  searchFor: string; //term(-1) or relationship number(0 and plus)
  defs = "defs";
  constructor(private activatedRoute: ActivatedRoute, private jdmService: JDMService,  private router: Router) { }

  ngOnInit() {
   this.pageLoading = true;
   this.activatedRoute.paramMap.subscribe(
    (params: ParamMap) => {
      this.searchFor = params.get("searchFor");
       //console.log("searchFor: " + this.searchFor);
      this.term = params.get('term');
      this.sortOptions = params.get('sortOptions');
      //console.log("sort options: " + this.sortOptions);

      if(this.searchFor == "-1"){
      console.log("if");
      this.jdmService.getTerm(this.term, this.sortOptions).subscribe((res)=>{
        this.resJson = res;
        //console.log(this.resJson);
        this.defsPage = 1;
        for(var i = 0; i < this.resJson['rts'].length; i++){
          this.p[i] = 1;
          //console.log(this.resJson['term']['name']);
          this.displayTerm = this.resJson['term']['name'];
          this.rels[this.resJson['rts'][i]['id']] = {"count": this.resJson['rt_'+this.resJson['rts'][i]['id']]['count'], "relations":this.resJson['rt_'+this.resJson['rts'][i]['id']]['relations']};
          
        }

        this.pageLoading = false;
      });
      }
      else{
      console.log("else");
        this.jdmService.getTermWithSelectedRT(this.term, this.sortOptions, this.searchFor).subscribe((res)=>{
        this.resJson = res;
        //console.log(this.resJson);
        this.defsPage = 1;
        for(var i = 0; i < this.resJson['rts'].length; i++){
          this.p[i] = 1;
          //console.log(this.resJson['term']['name']);
          this.displayTerm = this.resJson['term']['name'];
          this.rels[this.resJson['rts'][i]['id']] = {"count": this.resJson['rt_'+this.resJson['rts'][i]['id']]['count'], "relations":this.resJson['rt_'+this.resJson['rts'][i]['id']]['relations']};
          
        }
        this.pageLoading = false;
      });
      }
    }
    )
 }

public searchJDM(string){
  this.pageLoading = true;
  this.searchFor = -1;
  string = string.replace(/\s/gm,'+');
  //console.log("search jdm: " + string);
  this.router.navigate(["/term", {term: string, sortOptions: this.sortOptions, searchFor: -1}]);
}

getPageForRel(page: number, index: number,  rel: number) {
        this.loading = true;
        this.jdmService.getRelPageForTerm(this.term, rel, page, this.sortOptions).subscribe((res)=>
          {
            this.rels[rel]['relations'] = res ;
            this.p[index] = page;
            this.loading = false;
          }
        );
    }

getPageForDefs(page: number) {
        this.loading = true;
        this.jdmService.getDefPageForTerm(this.term, page).subscribe((res)=>
          {
            //console.log(res);
            this.resJson['defs']['definitions'] = res ;
            this.defsPage = page;
            this.loading = false;
          }
        );
    }    
}
