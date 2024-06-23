import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovalHRServiceListComponent } from './approval-hrservice-list.component';
import { AuthGuard } from '../../auth-guard.guard';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ApprovalHRServiceListComponent , canActivate: [AuthGuard]},
		{ path: 'view/:id',  loadChildren: () => import('../approval-hrservice-detail/approval-hrservice-detail.module').then((m) => m.ApprovalHRServiceDetailModule) },
	])],
	exports: [RouterModule]
})
export class ApprovalHRServiceListRoutingModule { }