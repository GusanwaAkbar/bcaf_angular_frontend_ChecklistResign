import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovalHRLearningListComponent } from './approval-hrlearning-list.component';
import { AuthGuard } from '../../auth-guard.guard';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ApprovalHRLearningListComponent , canActivate: [AuthGuard]},
		{ path: 'view/:id',  loadChildren: () => import('../approval-hrlearning-detail/approval-hrlearning-detail.module').then((m) => m.ApprovalHRLearningDetailModule) },
	])],
	exports: [RouterModule]
})
export class ApprovalHRLearningListRoutingModule { }