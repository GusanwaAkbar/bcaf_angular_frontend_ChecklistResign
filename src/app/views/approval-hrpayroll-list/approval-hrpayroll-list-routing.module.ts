import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovalHRPayrollListComponent } from './approval-hrpayroll-list.component';
import { AuthGuard } from '../../auth-guard.guard';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ApprovalHRPayrollListComponent , canActivate: [AuthGuard]},
		{ path: 'view/:id',  loadChildren: () => import('../approval-hrpayroll-detail/approval-hrpayroll-detail.module').then((m) => m.ApprovalHRPayrollDetailModule) },
	])],
	exports: [RouterModule]
})
export class ApprovalHRPayrollListRoutingModule { }