// src/app/components/approval-atasan/approval-atasan.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApprovalAtasanService } from '../../services/approval-atasan.service'
import { ApprovalAtasanGet } from '../../models/approval-atasan';
import { ApprovalAtasanPost } from '../../models/approval-atasan';
import { Resignation, ResignationGet } from 'src/app/models/resignation.model';
import { UserDetail } from 'src/app/models/user-detail';
import { ApiResponse, ApiResponseList } from 'src/app/models/api-response';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-approval-atasan',
  templateUrl: './approvalatasan-list.component.html',
  styleUrls: ['./approvalatasan-list.component.scss']
})
export class ApprovalAtasanListComponent implements OnInit {

  approvals: any[] = [];
  username: string = '20000022'; // Example username, you can change as needed
  isLoading$ = this.loadingService.loading$;

  constructor(private approvalAtasanService: ApprovalAtasanService,private router: Router, private loadingService:LoadingService) { }

  ngOnInit(): void {
    this.getApprovalList();
  }

  getApprovalList(): void {
    this.approvalAtasanService.getApprovalAtasanList().subscribe(
      (response:ApiResponseList<ApprovalAtasanGet>) => {
        this.approvals = response.data


        console.log("this approvals")
        console.log(this.approvals)




      },
      (      error: any) => {
        console.error('Error fetching approval list', error);
      }
    );
  }

  viewApproval(id: number): void {
    this.router.navigate(['/approval-atasan/view/', id]);
  }
}
