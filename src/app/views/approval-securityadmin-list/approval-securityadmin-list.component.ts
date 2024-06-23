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
import { IApprovalSecurityAdminGet } from '../../models/IApprovalSecurityAdmin.model';
//import { IApprovalSecurityAdminGet } from '../../models/IApprovalSecurityAdmin.model';

@Component({
  selector: 'app-approval-atasan',
  templateUrl: './approval-securityadmin-list.component.html',
  styleUrls: ['./approval-securityadmin-list.component.scss']
})
export class ApprovalSecurityAdminListComponent implements OnInit {

  SecurityAdminApprovals: any[] = [];


  constructor(private approvalDepartementService: ApprovalDepartementService,private router: Router) { }

  ngOnInit(): void {
    this.getApprovalList();
  }

  getApprovalList(): void {
    this.approvalDepartementService.getApprovalSecurityAdminList().subscribe(
      (response:ApiResponseList<IApprovalSecurityAdminGet>) => {
        this.SecurityAdminApprovals = response.data

        this.SecurityAdminApprovals

        console.log("this treasury data")

        console.log("this approvals")
        console.log(this.SecurityAdminApprovals)

      },
      (      error: any) => {
        console.error('Error fetching approval list', error);
      }
    );
  }

  viewApproval(id: number): void {
    this.router.navigate(['/approval-securityadmin/view/', id]);
  }
}
