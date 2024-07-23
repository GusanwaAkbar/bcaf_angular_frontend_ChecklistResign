// src/app/components/approval-hrservice/approval-hrservice-list.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApprovalDepartementService } from '../../services/approval-departement-service.service';
import { IApprovalHRServiceGet } from '../../models/IApprovalHRService.model';
import { ApiResponsePage } from '../../models/api-response';

@Component({
  selector: 'app-approval-hrservice',
  templateUrl: './approval-hrservice-list.component.html',
  styleUrls: ['./approval-hrservice-list.component.scss']
})
export class ApprovalHRServiceListComponent implements OnInit {

  hrServiceApprovals: IApprovalHRServiceGet[] = [];
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
      approvalHRServiceStatus: ['null']
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
    this.approvalDepartementService.getApprovalHRServicesAdminListV2(
      this.currentPage,
      this.pageSize,
      filters.nipKaryawanResign,
      filters.namaKaryawan,
      filters.approvalHRServiceStatus,
      this.sortBy,
      this.sortDirection
    ).subscribe(
      (response: ApiResponsePage<IApprovalHRServiceGet>) => {
        this.hrServiceApprovals = response.data.content;
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

  viewApproval(id: any): void {
    this.router.navigate(['/approval-hrservice/view/', id]);
  }
}
