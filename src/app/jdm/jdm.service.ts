import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable, of, throwError, Subject } from 'rxjs';
import { catchError, tap} from 'rxjs/operators';
import { map } from 'rxjs/operators';

const httpOptions = {
headers: new HttpHeaders({'Content-Type': 'text/plain'})
};

@Injectable({
providedIn: 'root'
})

export class JDMService {
subject: Subject<Observable<any>> = new Subject();
baseURL: String = "https://jdm-server-php.herokuapp.com/";
//baseURL: String = "http://localhost:8011/jdm/";

constructor(private httpClient: HttpClient) { }

getTest(): Observable<any>{
	var obs: Observable<any> = this.httpClient.get<any>(this.baseURL + "index.php?term=buche");
	console.log(obs); 
	return obs;
}

getTerm(term: string) : Observable<any>{
	var obs: Observable<any> = this.httpClient.get<any>(this.baseURL + "index.php?term=" + term);
	console.log(obs); 
	return obs;
}
}
