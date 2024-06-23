import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApprovalDepartementService } from 'src/app/services/approval-departement-service.service';
import { ApiResponse } from 'src/app/models/api-response';
import { UserDetail } from 'src/app/models/user-detail';

@Component({
  selector: 'app-final-approval',
  templateUrl: './approval-finalapproval-detail.component.html',
  styleUrls: ['./approval-finalapproval-detail.component.scss']
})
export class ApprovalFinalApprovalDetailComponent implements OnInit {

  approvalData: any | null = null;
  userDetailResign: UserDetail | null = null;
  userDetailAtasan: UserDetail | null = null;

  constructor(
    private approvalDepartementService: ApprovalDepartementService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.loadFinalApproval(id);
    });
  }

  loadFinalApproval(id: number): void {
    this.approvalDepartementService.getApprovalFinalApprovalById(id).subscribe((response: ApiResponse<any>) => {
      this.approvalData = response.data;
      this.userDetailResign = this.approvalData.userDetailResign;
      this.userDetailAtasan = this.approvalData.userDetailAtasan;
      console.log("Full Approval Data:", this.approvalData);
    });
  }
}
