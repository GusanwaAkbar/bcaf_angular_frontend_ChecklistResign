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
import { IApprovalHRIRGet } from '../../models/IApprovalHRIR.model';
//import { IApprovalHRIRGet } from '../../models/IApprovalHRIR.model';

@Component({
  selector: 'app-approval-atasan',
  templateUrl: './approval-hrir-list.component.html',
  styleUrls: ['./approval-hrir-list.component.scss']
})
export class ApprovalHRIRListComponent implements OnInit {

  HRIRApprovals: any[] = [];


  constructor(private approvalDepartementService: ApprovalDepartementService,private router: Router) { }

  ngOnInit(): void {
    this.getApprovalList();
  }

  getApprovalList(): void {
    this.approvalDepartementService.getApprovalHRIRList().subscribe(
      (response:ApiResponseList<IApprovalHRIRGet>) => {
        this.HRIRApprovals = response.data

        this.HRIRApprovals

        console.log("this treasury data")

        console.log("this approvals")
        console.log(this.HRIRApprovals)

      },
      (      error: any) => {
        console.error('Error fetching approval list', error);
      }
    );
  }

  viewApproval(id: number): void {
    this.router.navigate(['/approval-hrir/view/', id]);
  }
}
