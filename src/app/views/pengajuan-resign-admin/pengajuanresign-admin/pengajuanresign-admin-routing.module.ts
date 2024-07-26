import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PengajuanResignAdminComponent } from './pengajuanresign-admin.component'
import {AuthGuard} from '../../../auth-guard.guard'

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: PengajuanResignAdminComponent , canActivate: [AuthGuard]}
	])],
	exports: [RouterModule]
})
export class PengajuanResignRoutingModule { }