import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PengajuanResignDetailComponent } from './pengajuanresign-detail.component';
import {AuthGuard} from '../../../auth-guard.guard'

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: PengajuanResignDetailComponent , canActivate: [AuthGuard]}
	])],
	exports: [RouterModule]
})
export class PengajuanResignDetailRoutingModule { }