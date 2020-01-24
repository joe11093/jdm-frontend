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
  constructor(private jdmService: JDMService, private router: Router) {
  }

  ngOnInit() {
  	this.sortOptions = "weight";
  }

  onSubmit(){
  	console.log("term: " + this.term);
    this.router.navigate(["/term", {term: this.term, sortOptions: this.sortOptions}]);
    console.log("selected sorting: " + this.sortOptions);
  }
}
