import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovalHRIRListComponent } from './approval-hrir-list.component';
import { AuthGuard } from '../../auth-guard.guard';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ApprovalHRIRListComponent , canActivate: [AuthGuard]},
		{ path: 'view/:id',  loadChildren: () => import('../approval-hrir-detail/approval-hrir-detail.module').then((m) => m.ApprovalHRIRDetailModule) },
	])],
	exports: [RouterModule]
})
export class ApprovalHRIRListRoutingModule { }