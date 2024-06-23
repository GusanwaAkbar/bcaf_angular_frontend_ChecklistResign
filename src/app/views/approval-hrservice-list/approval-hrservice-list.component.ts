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
import { IApprovalHRServiceGet } from '../../models/IApprovalHRService.model';
//import { IApprovalHRServiceGet } from '../../models/IApprovalHRService.model';

@Component({
  selector: 'app-approval-atasan',
  templateUrl: './approval-hrservice-list.component.html',
  styleUrls: ['./approval-hrservice-list.component.scss']
})
export class ApprovalHRServiceListComponent implements OnInit {

  HRServiceApprovals: any[] = [];


  constructor(private approvalDepartementService: ApprovalDepartementService,private router: Router) { }

  ngOnInit(): void {
    this.getApprovalList();
  }

  getApprovalList(): void {
    this.approvalDepartementService.getApprovalHRServiceList().subscribe(
      (response:ApiResponseList<IApprovalHRServiceGet>) => {
        this.HRServiceApprovals = response.data

        this.HRServiceApprovals

        console.log("this treasury data")

        console.log("this approvals")
        console.log(this.HRServiceApprovals)

      },
      (      error: any) => {
        console.error('Error fetching approval list', error);
      }
    );
  }

  viewApproval(id: number): void {
    this.router.navigate(['/approval-hrservice/view/', id]);
  }
}
