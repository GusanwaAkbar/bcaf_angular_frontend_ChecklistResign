import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovalHRLearningDetailComponent } from './approval-hrlearning-detail.component';
import { AuthGuard } from '../../auth-guard.guard';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ApprovalHRLearningDetailComponent , canActivate: [AuthGuard]}
	])],
	exports: [RouterModule]
})
export class ApprovalHRLearningDetailRoutingModule { }