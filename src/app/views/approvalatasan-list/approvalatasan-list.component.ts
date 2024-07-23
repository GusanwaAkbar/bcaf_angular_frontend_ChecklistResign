import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApprovalAtasanService } from '../../services/approval-atasan.service';
import { ApprovalAtasanGet } from '../../models/approval-atasan';
import { ApiResponsePage } from 'src/app/models/api-response';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-approval-atasan',
  templateUrl: './approvalatasan-list.component.html',
  styleUrls: ['./approvalatasan-list.component.scss']
})
export class ApprovalAtasanListComponent implements OnInit {
  approvals: ApprovalAtasanGet[] = [];
  username: string = '20000022'; // Example username, you can change as needed
  isLoading$ = this.loadingService.loading$;
  filterForm: FormGroup;
  currentPage: number = 0;
  pageSize: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;
  sortBy: string = 'namaKaryawan';
  sortDirection: string = 'asc';

  constructor(
    private approvalAtasanService: ApprovalAtasanService,
    private router: Router,
    private loadingService: LoadingService,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      nipKaryawanResign: [''],
      namaKaryawan: [''],
      approvalStatusAtasan: ['null']
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
    const { nipKaryawanResign, namaKaryawan, approvalStatusAtasan } = this.filterForm.value;
    this.approvalAtasanService.getApprovalAtasanListV2(
      this.currentPage,
      this.pageSize,
      nipKaryawanResign,
      namaKaryawan,
      approvalStatusAtasan,
      this.sortBy,
      this.sortDirection
    ).subscribe(
      (response: ApiResponsePage<ApprovalAtasanGet>) => {
        console.log('Service Response:', response); // Log the response to check its structure
        this.approvals = response.data.content; // Ensure this is an array
        this.totalItems = response.data.totalElements;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
      },
      (error: any) => {
        console.error('Error fetching approval list', error);
      }
    );
  }

  viewApproval(id: number): void {
    this.router.navigate(['/approval-atasan/view/', id]);
  }

  onFilter(): void {
    this.currentPage = 0;
    this.getApprovalList();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.getApprovalList();
  }

  onSort(sortBy: string): void {
    this.sortDirection = this.sortBy === sortBy && this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortBy = sortBy;
    this.getApprovalList();
  }
}
