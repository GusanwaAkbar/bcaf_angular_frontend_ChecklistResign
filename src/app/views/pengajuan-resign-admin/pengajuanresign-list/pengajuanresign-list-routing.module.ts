import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PengajuanResignListComponent } from './pengajuanresign-list.component';
import { AuthGuard } from '../../../auth-guard.guard';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: PengajuanResignListComponent , canActivate: [AuthGuard]},
	//	{ path: 'view', loadChildren: () => import('../approvalatasan copy/approvalatasan.module').then((m) => m.ApprovalAtasanModule) },
		{ path: 'view/:nipKaryawan',  loadChildren: () => import('../pengajuanresign-detail/pengajuanresign-detail.module').then((m) => m.PengajuanResignDetailModule) },
	])],
	exports: [RouterModule]
})
export class ApprovalAtasanListRoutingModule { }