import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResignationService } from '../../services/resignation.service';
import { ApiResponse, ApiResponseList } from '../../models/api-response';
import { Resignation, ResignationGet } from '../../models/resignation.model';
import {AdminService} from '../../services/admin.service'

@Component({
  selector: 'app-approval-atasan',
  templateUrl: './admin-pengajuanresign-list.component.html',
  styleUrls: ['admin-pengajuanresign-list.component.scss']
})
export class AdminPengajuanResignListComponent implements OnInit {

  FinalApprovalApprovals: any[] = [];

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.getApprovalList();
  }

  getApprovalList(): void {
    this.adminService.getResignationAdmin().subscribe(
      (response: any) => {
        if (response.success) {

          console.log("get resignation data all admin")
          console.log(response.data)


          this.FinalApprovalApprovals = response.data;
        } else {
          console.error('Error fetching approval list', response.message);
        }
      },
      (error: any) => {
        console.error('Error fetching approval list', error);
      }
    );
  }

  viewApproval(id: number): void {
    this.router.navigate(['/approval-finalapproval/view/', id]);
  }
}
