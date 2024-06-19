import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PengajuanResignComponent } from './pengajuanresign.component'
import {AuthGuard} from '../../../auth-guard.guard'

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: PengajuanResignComponent , canActivate: [AuthGuard]}
	])],
	exports: [RouterModule]
})
export class PengajuanResignRoutingModule { }