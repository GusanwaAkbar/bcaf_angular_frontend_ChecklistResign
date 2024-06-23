import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovalGeneralServiceListComponent } from './approval-generalservice-list.component';
import { AuthGuard } from '../../auth-guard.guard';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ApprovalGeneralServiceListComponent , canActivate: [AuthGuard]},
		{ path: 'view/:id',  loadChildren: () => import('../approval-generalservice-detail/approval-generalservice-detail.module').then((m) => m.ApprovalGeneralServiceDetailModule) },
	])],
	exports: [RouterModule]
})
export class ApprovalGeneralServiceListRoutingModule { }