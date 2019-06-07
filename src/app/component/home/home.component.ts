import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {
	usermessage;

	constructor(private loginService: LoginService) {}

	ngOnInit() {}

	getUserMessage() {
		this.loginService.getHello().subscribe(
			(res) => {
				this.usermessage = res;
			},
			(error) => {
				console.log(error);
				this.usermessage = undefined;
			}
		);
	}
}
