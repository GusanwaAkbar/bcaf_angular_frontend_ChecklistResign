// src/app/components/approval-atasan/approval-atasan.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApprovalAtasanService } from '../../services/approval-atasan.service'
import { ApprovalAtasanGet } from '../../models/approval-atasan';
import { ApprovalAtasanPost } from '../../models/approval-atasan';
import { Resignation, ResignationGet } from '../../models/resignation.model';
import { UserDetail } from '../../models/user-detail';
import { ApiResponse, ApiResponseList } from '../../models/api-response';
import { Router } from '@angular/router';
import {ApprovalDepartementService} from '../../services/approval-departement-service.service'
import { IApprovalTreasuryGet } from '../../models/IApprovalTreasury.model';
//import { IApprovalFinalApprovalGet } from '../../models/IApprovalFinalApproval.model';
//import { IApprovalFinalApprovalGet } from '../../models/IApprovalFinalApproval.model';

@Component({
  selector: 'app-approval-atasan',
  templateUrl: './approval-finalapproval-list.component.html',
  styleUrls: ['./approval-finalapproval-list.component.scss']
})
export class ApprovalFinalApprovalListComponent implements OnInit {

  FinalApprovalApprovals: any[] = [];


  constructor(private approvalDepartementService: ApprovalDepartementService,private router: Router) { }

  ngOnInit(): void {
    this.getApprovalList();
  }

  getApprovalList(): void {
    this.approvalDepartementService.getApprovalFinalApprovalList().subscribe(
      (response:ApiResponseList<any>) => {
        this.FinalApprovalApprovals = response.data

        this.FinalApprovalApprovals

        console.log("this treasury data")

        console.log("this approvals")
        console.log(this.FinalApprovalApprovals)

      },
      (      error: any) => {
        console.error('Error fetching approval list', error);
      }
    );
  }

  viewApproval(id: number): void {
    this.router.navigate(['/approval-finalapproval/view/', id]);
  }
}
