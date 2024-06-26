import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApprovalDepartementService } from 'src/app/services/approval-departement-service.service';
import { ApiResponse } from 'src/app/models/api-response';
import { UserDetail } from 'src/app/models/user-detail';
import { ApprovalAtasanGet } from 'src/app/models/approval-atasan';

@Component({
  selector: 'app-final-approval',
  templateUrl: './approval-finalapproval-detail.component.html',
  styleUrls: ['./approval-finalapproval-detail.component.scss']
})
export class ApprovalFinalApprovalDetailComponent implements OnInit {

  approvalData: any;
  userDetailResign: UserDetail | null = null;
  userDetailAtasan: UserDetail | null = null;
  approvalAtasanData: ApprovalAtasanGet | undefined 

  //Approval atasan
  approvalAtasan: any;
  approvalGeneralService: any;
  approvalHRIR: any;
  approvalHRTalent:any;
  approvalHRLearning: any;
  approvalHRPayroll: any;
  approvalHRServicesAdmin: any;
  approvalSecurityAdministrator:any;
  approvalTreasury: any;

  

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
      let responseData = this.approvalData;

      this.userDetailResign = responseData.userDetailResign;
      this.userDetailAtasan = responseData.userDetailAtasan;
      this.approvalAtasanData = responseData.approvalAtasan;


      console.log("finalresponsedata")
      console.log(responseData)

      //fetch approvals data
      this.approvalGeneralService = responseData.approvalGeneralServices;
      this.approvalAtasan = responseData.approvalAtasan;
      this.approvalHRIR = responseData.approvalHRIR;
      this.approvalHRLearning = responseData.approvalHRLearning;
      this.approvalHRPayroll = responseData.approvalHRPayroll;
      this.approvalHRServicesAdmin = responseData.approvalHRServicesAdmin;
      this.approvalSecurityAdministrator = responseData.approvalSecurityAdministrator;
      this.approvalTreasury = responseData.approvalTreasury;
      this.approvalHRTalent = responseData.approvalHRTalent;
      
      console.log("hrir")
      console.log(this.approvalHRIR)


      console.log("hr talent")
      console.log(this.approvalHRTalent)

      console.log("Full Approval Data:", this.approvalData);
    });
  }
}
