import { Injectable } from '@angular/core';
// import { ErrorDialogService } from '../error-dialog/error-dialog.service';
import {
	HttpInterceptor,
	HttpRequest,
	HttpResponse,
	HttpHandler,
	HttpEvent,
	HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LoginService } from '../services/login.service';

@Injectable({
	providedIn: 'root'
})
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private loginService: LoginService) {}
	private setHeaders(request: HttpRequest<any>) {
		request = request.clone({
			setHeaders: {
				Authorization: `Bearer ${localStorage.getItem('api-token-test')}`
			}
		});
		return request;
	}

	private setHeaders1(request: HttpRequest<any>) {
		request = request.clone({
			setHeaders: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			}
		});
		return request;
	}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const token: string = localStorage.getItem('api-token-test');
		request = this.setHeaders1(request);
		if (!request.url.includes('token')) {
			console.log('NOT AUTH');
			request = this.setHeaders(request);
		}

		return next.handle(request).pipe(
			map((event: HttpEvent<any>) => {
				if (event instanceof HttpResponse) {
					if (event.status === 200) {
						console.log('REQUEST COMPLETED');
					}
					if (event.status === 401) {
						console.log('TOKEN EXPIRED 401 ERROR');
					}
				}
				return event;
			}),
			catchError((error: HttpErrorResponse) => {
				console.log(error.status);
				if (error.status === 401) {
					this.clearLocalStorage();
					this.addAuth(next, request, error.url);
				}
				let data = {};
				data = {
					reason: error && error.error.reason ? error.error.reason : '',
					status: error.status
				};
				return throwError(error);
			})
		);
	}

	private addAuth(next: HttpHandler, request: HttpRequest<any>, url: string) {
		this.loginService.login().subscribe((res) => {
			console.log(res);
			localStorage.setItem('api-token-test', res.result.token);
			request = request.clone({ url: url });
			request = this.setHeaders(request);
			next.handle(request);
			return next.handle(request);
		});
	}

	private clearLocalStorage() {
		localStorage.removeItem('api-token-test');
	}
}
