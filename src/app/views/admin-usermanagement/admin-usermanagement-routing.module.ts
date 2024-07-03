import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUserManagementComponent } from './admin-usermanagement.component';
import { AuthGuard } from '../../auth-guard.guard';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: AdminUserManagementComponent , canActivate: [AuthGuard]},
		// { path: 'view/:id',  loadChildren: () => import('../approval-finalapproval-detail/approval-finalapproval-detail.module').then((m) => m.ApprovalFinalApprovalDetailModule) },
	])],
	exports: [RouterModule]
})
export class AdminUserManagementRoutingModule { }