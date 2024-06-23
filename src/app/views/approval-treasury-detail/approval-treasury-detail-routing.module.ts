import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovalTreasuryDetailComponent } from './approval-treasury-detail.component';
import { AuthGuard } from '../../auth-guard.guard';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ApprovalTreasuryDetailComponent , canActivate: [AuthGuard]}
	])],
	exports: [RouterModule]
})
export class ApprovalTreasuryDetailRoutingModule { }