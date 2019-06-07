import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AppRoutingModule } from './route/app-routing/app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth-interceptor.service';
import { LoginService } from './services/login.service';

@NgModule({
	declarations: [ AppComponent, HomeComponent, LoginComponent, DashboardComponent ],
	imports: [ BrowserModule, AppRoutingModule, HttpClientModule ],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true
		},
		LoginService
	],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
