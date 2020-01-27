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
  public rels = {};
  searchFor: string;
  defs = "defs";
  constructor(private activatedRoute: ActivatedRoute, private jdmService: JDMService,  private router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      (params: ParamMap) => {
        this.searchFor = params.get("searchFor");
       console.log("searchFor: " + this.searchFor);
      this.term = params.get('term');
      this.sortOptions = params.get('sortOptions');
      this.orientation = params.get('orientation');
      console.log("sortOptions: " + this.sortOptions);
      console.log("orientation: " + this.orientation);
      if(this.searchFor == "-1"){ //if searching for whole term
        this.jdmService.getTerm(this.term, this.sortOptions, this.orientation).subscribe((res)=>{
        //console.log(res);
        this.resJson = res;
        //console.log(this.resJson);
        //console.log(resJson.length);
        //console.log(this.resJson.defs.definitions);
        if(this.resJson['error'] != null){
          console.log("ERROR");
        }else{
        //console.log("no errors");
          this.defsPage = 1;

          if(typeof  (this.resJson['rts']) !== "undefined"){
          //console.log("exact search condition");
            for(var i = 0; i < this.resJson['rts']['types'].length; i++){
              this.p[i] = 1;
              //console.log("loop");
              //console.log(this.resJson['term']['name']);
              this.displayTerm = this.resJson['term']['name'];
              //console.log(this.displayTerm);
              //console.log(this.resJson['rts']['types'][0]['id']);
              this.rels[this.resJson['rts']['types'][i]['id']] = {"count": this.resJson['rt_'+this.resJson['rts']['types'][i]['id']][this.orientation]['count'], "relations":this.resJson['rt_'+this.resJson['rts']['types'][i]['id']][this.orientation]['relations']};
            }
        }
        else{
          console.log("related terms condition");
          this.p[0]=1;
          this.displayTerm = this.resJson['term']['name'];
          this.rels['count'] = this.resJson['related_terms']['count'];
          this.rels['terms'] = [];
          //console.log("count: " + this.rels['count']);
          for(var i = 0; i < this.resJson['related_terms']['terms'].length; i++){
              this.rels['terms'][i] = this.resJson['related_terms']['terms'][i];
          }

        }
        console.log("resJson");
        console.log(this.resJson);
        console.log("rels");
        console.log(this.rels);
        console.log(this.rels['count']);
        }
        

        this.pageLoading = false;
      });
      }
      else{ //if searching for a particular relation
         this.jdmService.getTermWithSelectedRT(this.term, this.sortOptions, this.searchFor).subscribe((res)=>{
            //console.log(res);
            this.resJson = res;
            if(this.resJson['error'] != null){
                console.log("ERROR");
            }else{
              this.defsPage = 1;
              for(var i = 0; i < this.resJson['rts']['types'].length; i++){
                this.p[i] = 1;
                this.displayTerm = this.resJson['term']['name'];
                this.rels[this.resJson['rts']['types'][i]['id']] = {"count": this.resJson['rt_'+this.resJson['rts']['types'][i]['id']][this.orientation]['count'], "relations":this.resJson['rt_'+this.resJson['rts']['types'][i]['id']][this.orientation]['relations']};
              }
            }
         });
      }
      
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
            //console.log(res);
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
