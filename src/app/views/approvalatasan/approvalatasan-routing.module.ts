import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovalAtasanComponent } from './approvalatasn.component';
import { AuthGuard } from 'src/app/auth-guard.guard';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ApprovalAtasanComponent , canActivate: [AuthGuard]}
	])],
	exports: [RouterModule]
})
export class ApprovalAtasanRoutingModule { }