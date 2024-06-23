import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovalFinalApprovalListComponent } from './approval-finalapproval-list.component';
import { AuthGuard } from '../../auth-guard.guard';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ApprovalFinalApprovalListComponent , canActivate: [AuthGuard]},
		{ path: 'view/:id',  loadChildren: () => import('../approval-finalapproval-detail/approval-finalapproval-detail.module').then((m) => m.ApprovalFinalApprovalDetailModule) },
	])],
	exports: [RouterModule]
})
export class ApprovalFinalApprovalListRoutingModule { }