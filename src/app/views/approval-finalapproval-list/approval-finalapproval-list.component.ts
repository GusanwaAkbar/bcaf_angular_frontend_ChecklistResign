// src/app/components/approval-atasan/approval-finalapproval-list.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApprovalDepartementService } from '../../services/approval-departement-service.service';
import { ApiResponsePage } from '../../models/api-response';

@Component({
  selector: 'app-approval-atasan',
  templateUrl: './approval-finalapproval-list.component.html',
  styleUrls: ['./approval-finalapproval-list.component.scss']
})
export class ApprovalFinalApprovalListComponent implements OnInit {

  FinalApprovalApprovals: any[] = [];
  filterForm: FormGroup;
  currentPage = 0;
  pageSize = 10;
  totalItems = 0;
  totalPages = 0;
  sortBy = 'createdDate'; // Default sort field
  sortDirection = 'desc'; // Default sort direction

  constructor(
    private fb: FormBuilder,
    private approvalDepartementService: ApprovalDepartementService,
    private router: Router
  ) {
    this.filterForm = this.fb.group({
      nipKaryawanResign: [''],
      namaKaryawan: [''],
      approvalFinalApprovalStatus: ['']
    });
  }

  ngOnInit(): void {
    this.getApprovalList();
    this.filterForm.valueChanges.subscribe(() => {
      this.currentPage = 0;
      this.getApprovalList();
    });
  }

  getApprovalList(): void {
    const filters = this.filterForm.value;
    this.approvalDepartementService.getApprovalFinalApprovalListV2(
      this.currentPage,
      this.pageSize,
      filters.nipKaryawanResign,
      filters.namaKaryawan,
      filters.approvalFinalApprovalStatus,
      this.sortBy,
      this.sortDirection
    ).subscribe(
      (response: ApiResponsePage<any>) => {
        this.FinalApprovalApprovals = response.data.content;
        this.totalItems = response.data.totalElements;
        this.totalPages = response.data.totalPages;
      },
      (error: any) => {
        console.error('Error fetching approval list', error);
      }
    );
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.getApprovalList();
  }

  onSort(column: string): void {
    if (this.sortBy === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = column;
      this.sortDirection = 'asc';
    }
    this.getApprovalList();
  }

  viewApproval(id: number): void {
    this.router.navigate(['/approval-finalapproval/view/', id]);
  }
}
