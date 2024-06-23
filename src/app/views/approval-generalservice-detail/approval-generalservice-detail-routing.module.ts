import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovalGeneralServiceDetailComponent } from './approval-generalservice-detail.component';
import { AuthGuard } from '../../auth-guard.guard';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ApprovalGeneralServiceDetailComponent , canActivate: [AuthGuard]}
	])],
	exports: [RouterModule]
})
export class ApprovalGeneralServiceDetailRoutingModule { }