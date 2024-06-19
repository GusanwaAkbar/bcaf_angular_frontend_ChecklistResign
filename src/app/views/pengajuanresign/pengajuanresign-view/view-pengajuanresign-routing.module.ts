import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewPengajuanResignComponent } from './view-pengajuanresign.component';
import {AuthGuard} from '../../../auth-guard.guard'

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ViewPengajuanResignComponent , canActivate: [AuthGuard]}
	])],
	exports: [RouterModule]
})
export class ViewPengajuanResignRoutingModule { }