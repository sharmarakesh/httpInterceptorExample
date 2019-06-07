import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from 'src/app/component/home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from 'src/app/component/dashboard/dashboard.component';

const routes: Routes = [ { path: '', component: HomeComponent }, { path: 'dashboard', component: DashboardComponent } ];
@NgModule({
	imports: [ CommonModule, RouterModule.forRoot(routes, { useHash: true }) ],
	exports: [ RouterModule ],
	declarations: []
})
export class AppRoutingModule {}
