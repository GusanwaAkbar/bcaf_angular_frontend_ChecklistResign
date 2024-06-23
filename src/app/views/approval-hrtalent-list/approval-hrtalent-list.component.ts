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
import { IApprovalHRTalentGet } from '../../models/IApprovalHRTalent.model';
//import { IApprovalHRTalentGet } from '../../models/IApprovalHRTalent.model';

@Component({
  selector: 'app-approval-atasan',
  templateUrl: './approval-hrtalent-list.component.html',
  styleUrls: ['./approval-hrtalent-list.component.scss']
})
export class ApprovalHRTalentListComponent implements OnInit {

  HRTalentApprovals: any[] = [];


  constructor(private approvalDepartementService: ApprovalDepartementService,private router: Router) { }

  ngOnInit(): void {
    this.getApprovalList();
  }

  getApprovalList(): void {
    this.approvalDepartementService.getApprovalHRTalentList().subscribe(
      (response:ApiResponseList<IApprovalHRTalentGet>) => {
        this.HRTalentApprovals = response.data

        this.HRTalentApprovals

        console.log("this treasury data")

        console.log("this approvals")
        console.log(this.HRTalentApprovals)

      },
      (      error: any) => {
        console.error('Error fetching approval list', error);
      }
    );
  }

  viewApproval(id: number): void {
    this.router.navigate(['/approval-hrtalent/view/', id]);
  }
}
