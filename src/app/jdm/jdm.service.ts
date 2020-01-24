import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable, of, throwError, Subject } from 'rxjs';
import { catchError, tap} from 'rxjs/operators';
import { map } from 'rxjs/operators';


@Injectable({
providedIn: 'root'
})

export class JDMService {
subject: Subject<Observable<any>> = new Subject();
baseURL: String = "https://jdm-server-php.herokuapp.com/";
per_page: number = 5;
//baseURL: String = "http://localhost:8011/jdm/";

constructor(private httpClient: HttpClient) { }

getTest(): Observable<any>{
	var obs: Observable<any> = this.httpClient.get<any>(this.baseURL + "index.php?term=buche");
	//console.log(obs); 
	return obs;
}

getTerm(term: string, sort: string) : Observable<any>{
	var path: string = this.baseURL + "index.php?term=" + term + "&sort=" + sort;
	var obs: Observable<any> = this.httpClient.get<any>(path);
	//console.log(obs); 
	console.log(path);
	return obs;
}


//https://jdm-server-php.herokuapp.com/paginate.php?term=buche&page=1&per_page=5&criterion=relation&type=3

getRelPageForTerm(term, rel, page, sort: string) : Observable<any>{
	var path: string = "" + this.baseURL + "paginate.php?term=" + term + "&page=" + page + "&per_page=" + this.per_page + "&criterion=relation" + "&type=" + rel + "&sort=" + sort;
	var obs: Observable<any> = this.httpClient.get<any>(path);
	//console.log("sort: " + sort); 
	console.log(path);
	return obs;
	}

getDefPageForTerm(term, page, sort) : Observable<any>{
	var obs: Observable<any> = this.httpClient.get<any>(this.baseURL + "paginate.php?term=" + term + "&per_page=" + this.per_page + "&criterion=definition");
	//console.log(obs); 
	console.log("sort: " + sort); 
	return obs;
	}

}
