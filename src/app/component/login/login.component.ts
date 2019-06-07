import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
	constructor(private loginService: LoginService) {}

	ngOnInit() {}

	login() {
		if (!localStorage.getItem('api-token-test')) {
			this.loginService.login().subscribe((res) => {
				console.log(res);
				localStorage.setItem('api-token-test', res.result.token);
			});
		} else {
			alert('already logged in');
		}
	}
}
