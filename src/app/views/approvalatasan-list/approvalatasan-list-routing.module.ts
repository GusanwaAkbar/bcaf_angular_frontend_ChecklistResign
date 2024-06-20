import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovalAtasanListComponent } from './approvalatasan-list.component';
import { AuthGuard } from 'src/app/auth-guard.guard';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ApprovalAtasanListComponent , canActivate: [AuthGuard]},
	//	{ path: 'view', loadChildren: () => import('../approvalatasan copy/approvalatasan.module').then((m) => m.ApprovalAtasanModule) },
		{ path: 'view/:id',  loadChildren: () => import('../approvalatasan copy/approvalatasan.module').then((m) => m.ApprovalAtasanModule) },
	])],
	exports: [RouterModule]
})
export class ApprovalAtasanListRoutingModule { }