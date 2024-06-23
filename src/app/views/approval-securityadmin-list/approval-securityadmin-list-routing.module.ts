import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovalSecurityAdminListComponent } from './approval-securityadmin-list.component';
import { AuthGuard } from '../../auth-guard.guard';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ApprovalSecurityAdminListComponent , canActivate: [AuthGuard]},
		{ path: 'view/:id',  loadChildren: () => import('../approval-securityadmin-detail/approval-securityadmin-detail.module').then((m) => m.ApprovalSecurityAdminDetailModule) },
	])],
	exports: [RouterModule]
})
export class ApprovalSecurityAdminListRoutingModule { }