import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovalAtasanComponent } from './approvalatasan.component';
import { AuthGuard } from '../../auth-guard.guard';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ApprovalAtasanComponent , canActivate: [AuthGuard]}
	])],
	exports: [RouterModule]
})
export class ApprovalAtasanRoutingModule { }