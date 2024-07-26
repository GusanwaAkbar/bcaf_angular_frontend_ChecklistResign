import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApprovalAtasanService } from '../../../services/approval-atasan.service';
import { ApprovalAtasanGet } from '../../../models/approval-atasan';
import { ApiResponsePage } from '../../../models/api-response';
import { Router } from '@angular/router';
import { LoadingService } from '../../../services/loading.service';
import { ResignationService } from 'src/app/services/resignation.service';
import { ResignationGet } from 'src/app/models/resignation.model';
import { cilSwapVertical } from '@coreui/icons';

@Component({
  selector: 'app-approval-atasan',
  templateUrl: './pengajuanresign-list.component.html',
  styleUrls: ['./pengajuanresign-list.component.scss']
})
export class PengajuanResignListComponent implements OnInit {
  approvals: ResignationGet[] = [];
  //username: string = '20000022'; // Example username, you can change as needed
  isLoading$ = this.loadingService.loading$;
  filterForm: FormGroup;
  currentPage: number = 0;
  pageSize: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;
  sortBy: string = 'namaKaryawan';
  sortDirection: string = 'asc';
   icons = { cilSwapVertical };

  constructor(
    private pengajuanResignService: ResignationService,
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
    this.pengajuanResignService.getResignationListV2(
      this.currentPage,
      this.pageSize,
      nipKaryawanResign,
      namaKaryawan,
      approvalStatusAtasan,
      this.sortBy,
      this.sortDirection
    ).subscribe(
      (response: ApiResponsePage<ResignationGet>) => {
        console.log('Service Response:', response); // Log the response to check its structure
        this.approvals = response.data.content; // Ensure this is an array
        this.totalItems = response.data.totalElements;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);

        console.log("logging devisi============")
        console.log(this.approvals[0].userDetailResign)
      },
      (error: any) => {
        console.error('Error fetching approval list', error);
      }
    );
  }

  viewApproval(nipKaryawan: string): void {
    this.router.navigate(['/admin-pengajuanresign-list/view/', nipKaryawan]);
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
