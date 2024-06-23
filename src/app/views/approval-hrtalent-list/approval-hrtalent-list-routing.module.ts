import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovalHRTalentListComponent } from './approval-hrtalent-list.component';
import { AuthGuard } from '../../auth-guard.guard';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ApprovalHRTalentListComponent , canActivate: [AuthGuard]},
		{ path: 'view/:id',  loadChildren: () => import('../approval-hrtalent-detail/approval-hrtalent-detail.module').then((m) => m.ApprovalHRTalentDetailModule) },
	])],
	exports: [RouterModule]
})
export class ApprovalHRTalentListRoutingModule { }