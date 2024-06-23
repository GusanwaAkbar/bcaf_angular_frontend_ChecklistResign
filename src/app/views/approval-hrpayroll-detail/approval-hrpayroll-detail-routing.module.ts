import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovalHRPayrollDetailComponent } from './approval-hrpayroll-detail.component';
import { AuthGuard } from '../../auth-guard.guard';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ApprovalHRPayrollDetailComponent , canActivate: [AuthGuard]}
	])],
	exports: [RouterModule]
})
export class ApprovalHRPayrollDetailRoutingModule { }