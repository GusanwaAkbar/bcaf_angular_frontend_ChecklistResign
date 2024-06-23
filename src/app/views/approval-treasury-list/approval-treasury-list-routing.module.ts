import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovalTreasuryListComponent } from './approval-treasury-list.component';
import { AuthGuard } from '../../auth-guard.guard';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ApprovalTreasuryListComponent , canActivate: [AuthGuard]},
		{ path: 'view/:id',  loadChildren: () => import('../approval-treasury-detail/approval-treasury-detail.module').then((m) => m.ApprovalTreasuryDetailModule) },
	])],
	exports: [RouterModule]
})
export class ApprovalTreasuryListRoutingModule { }