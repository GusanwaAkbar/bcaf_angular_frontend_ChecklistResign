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
import { IApprovalHRPayrollGet } from '../../models/IApprovalHRPayroll.model';

@Component({
  selector: 'app-approval-atasan',
  templateUrl: './approval-hrpayroll-list.component.html',
  styleUrls: ['./approval-hrpayroll-list.component.scss']
})
export class ApprovalHRPayrollListComponent implements OnInit {

  hrpayrollApprovals: any[] = [];


  constructor(private approvalDepartementService: ApprovalDepartementService,private router: Router) { }

  ngOnInit(): void {
    this.getApprovalList();
  }

  getApprovalList(): void {
    this.approvalDepartementService.getApprovalHRPayrollList().subscribe(
      (response:ApiResponseList<IApprovalHRPayrollGet>) => {
        this.hrpayrollApprovals = response.data

        this.hrpayrollApprovals

        console.log("this treasury data")

        console.log("this approvals")
        console.log(this.hrpayrollApprovals)

      },
      (      error: any) => {
        console.error('Error fetching approval list', error);
      }
    );
  }

  viewApproval(id: number): void {
    this.router.navigate(['/approval-hrpayroll/view/', id]);
  }
}
