import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovalFinalApprovalDetailComponent } from './approval-finalapproval-detail.component';
import { AuthGuard } from '../../auth-guard.guard';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ApprovalFinalApprovalDetailComponent , canActivate: [AuthGuard]}
	])],
	exports: [RouterModule]
})
export class ApprovalFinalApprovalDetailRoutingModule { }