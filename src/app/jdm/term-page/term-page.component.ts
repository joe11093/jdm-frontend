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
  public orientation: string;
  loading: boolean;
  pageLoading: boolean;
  rels = {};
  searchFor: string; //term(-1) or relationship number(0 and plus)
  defs = "defs";
  constructor(private activatedRoute: ActivatedRoute, private jdmService: JDMService,  private router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      (params: ParamMap) => {
        this.searchFor = params.get("searchFor");
       
      this.term = params.get('term');
      this.sortOptions = params.get('sortOptions');
      this.orientation = params.get('orientation');
      console.log("sortOptions: " + this.sortOptions);
      console.log("orientation: " + this.orientation);
      this.jdmService.getTerm(this.term, this.sortOptions, this.orientation).subscribe((res)=>{
        console.log(res);
        this.resJson = res;
        //console.log(this.resJson.defs.definitions);
        if(this.resJson['error'] != null){
          console.log("ERROR");
        }else{
          this.defsPage = 1;
        for(var i = 0; i < this.resJson['rts']['types'].length; i++){
          this.p[i] = 1;
          //console.log(this.resJson['term']['name']);
          this.displayTerm = this.resJson['term']['name'];
          //console.log(this.displayTerm);
          //console.log(this.resJson['rts']['types'][0]['id']);
          this.rels[this.resJson['rts']['types'][i]['id']] = {"count": this.resJson['rt_'+this.resJson['rts']['types'][i]['id']][this.orientation]['count'], "relations":this.resJson['rt_'+this.resJson['rts']['types'][i]['id']][this.orientation]['relations']};
          
        }
        //console.log(this.resJson);
        console.log(this.rels[0]);
        }
        

        this.pageLoading = false;
      });
      }
      )

  }

public searchJDM(string){
  this.pageLoading = true;
  this.searchFor = "-1";
  string = string.replace(/\s/gm,'+');
  //console.log("search jdm: " + string);
  this.router.navigate(["/term", {term: string, sortOptions: this.sortOptions, searchFor: -1, orientation: this.orientation}]);
}

getPageForRel(page: number, index: number,  rel: number) {
        this.loading = true;
        this.jdmService.getRelPageForTerm(this.term, rel, page, this.sortOptions, this.orientation).subscribe((res)=>
          {
            console.log(res);
            this.rels[rel]['relations'] = res[this.orientation]['relations'] ;
            this.p[index] = page;
            this.loading = false;
          }
        );
}
 
getPageForDefs(page: number) {
        this.loading = true;
        this.jdmService.getDefPageForTerm(this.term, page, this.sortOptions, this.orientation).subscribe((res)=>
          {
            //console.log(res);
            this.resJson['defs']['definitions'] = res.definitions ;
            this.defsPage = page;
            this.loading = false;
          }
        );
    }    




}
