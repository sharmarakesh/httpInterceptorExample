import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
	providedIn: 'root'
})
export class LoginService {
	private cred = {
		username: 'alex123',
		password: 'alex123'
	};

	private authURL = environment.apiUrl + 'token/generate-token';
	private userURL = environment.apiUrl + 'users';
	constructor(private _http: HttpClient) {}

	login(): Observable<any> {
		return this._http.post(this.authURL, { ...this.cred });
	}

	getHello(): Observable<any> {
		return this._http.get(this.userURL);
	}
}
