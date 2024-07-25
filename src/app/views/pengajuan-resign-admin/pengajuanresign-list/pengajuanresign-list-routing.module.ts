import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PengajuanResignListComponent } from './pengajuanresign-list.component';
import { AuthGuard } from '../../../auth-guard.guard';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: PengajuanResignListComponent , canActivate: [AuthGuard]},
	//	{ path: 'view', loadChildren: () => import('../approvalatasan copy/approvalatasan.module').then((m) => m.ApprovalAtasanModule) },
	//	{ path: 'view/:id',  loadChildren: () => import('../approvalatasan copy/approvalatasan.module').then((m) => m.ApprovalAtasanModule) },
	])],
	exports: [RouterModule]
})
export class ApprovalAtasanListRoutingModule { }