import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import {JDMService} from '../jdm.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
	term: string;
	public resJson: Object[];
  public sortOptions: any;
  public selectedRelation: string;
  public orientation: string;

  constructor(private jdmService: JDMService, private router: Router) {
    this.selectedRelation = "-1";
  }

  ngOnInit() {
  	this.sortOptions = "weight";
    this.orientation = "exiting";
  }

  onSubmit(){
  	//console.log("term: " + this.term);
    //console.log("selected sorting: " + this.sortOptions);
    //console.log("selected: " + this.selectedRelation);
    //console.log("orientation: " + this.orientation);
    this.router.navigate(["/term", {term: this.term, sortOptions: this.sortOptions, searchFor: this.selectedRelation, orientation: this.orientation}]);
  }
}
