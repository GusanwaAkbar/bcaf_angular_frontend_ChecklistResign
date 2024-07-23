// src/app/components/approval-hrlearning/approval-hrlearning-list.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApprovalDepartementService } from '../../services/approval-departement-service.service';
import { IApprovalHRLearningGet } from '../../models/IApprovalHRLearning.model';
import { ApiResponsePage } from '../../models/api-response';

@Component({
  selector: 'app-approval-hrlearning',
  templateUrl: './approval-hrlearning-list.component.html',
  styleUrls: ['./approval-hrlearning-list.component.scss']
})
export class ApprovalHRLearningListComponent implements OnInit {

  hrLearningApprovals: IApprovalHRLearningGet[] = [];
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
      approvalHRLearningStatus: ['null']
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
    this.approvalDepartementService.getApprovalHRLearningListV2(
      this.currentPage,
      this.pageSize,
      filters.nipKaryawanResign,
      filters.namaKaryawan,
      filters.approvalHRLearningStatus,
      this.sortBy,
      this.sortDirection
    ).subscribe(
      (response: ApiResponsePage<IApprovalHRLearningGet>) => {
        this.hrLearningApprovals = response.data.content;
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
    this.router.navigate(['/approval-hrlearning/view/', id]);
  }
}
