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
import { IApprovalGeneralServiceGet } from '../../models/IApprovalGeneralService.model';
//import { IApprovalGeneralServiceGet } from '../../models/IApprovalGeneralService.model';

@Component({
  selector: 'app-approval-atasan',
  templateUrl: './approval-generalservice-list.component.html',
  styleUrls: ['./approval-generalservice-list.component.scss']
})
export class ApprovalGeneralServiceListComponent implements OnInit {

  GeneralServiceApprovals: any[] = [];


  constructor(private approvalDepartementService: ApprovalDepartementService,private router: Router) { }

  ngOnInit(): void {
    this.getApprovalList();
  }

  getApprovalList(): void {
    this.approvalDepartementService.getApprovalGeneralServiceList().subscribe(
      (response:ApiResponseList<IApprovalGeneralServiceGet>) => {
        this.GeneralServiceApprovals = response.data

        this.GeneralServiceApprovals

        console.log("this treasury data")

        console.log("this approvals")
        console.log(this.GeneralServiceApprovals)

      },
      (      error: any) => {
        console.error('Error fetching approval list', error);
      }
    );
  }

  viewApproval(id: number): void {
    this.router.navigate(['/approval-generalservice/view/', id]);
  }
}
