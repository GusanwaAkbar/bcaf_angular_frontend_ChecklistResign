import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApprovalDepartementService } from 'src/app/services/approval-departement-service.service';
import { IApprovalHRPayrollGet, IApprovalHRPayrollPost } from 'src/app/models/IApprovalHRPayroll.model';
import { ResignationGet } from 'src/app/models/resignation.model';
import { UserDetail } from 'src/app/models/user-detail';
import { ApiResponse } from 'src/app/models/api-response';
import { LoadingService } from 'src/app/services/loading.service';
import Swal from 'sweetalert2';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-approval-hrpayroll',
  templateUrl: './approval-hrpayroll-detail.component.html',
  styleUrls: ['./approval-hrpayroll-detail.component.scss']
})
export class ApprovalHRPayrollDetailComponent implements OnInit {

  approvalHRPayrollData: IApprovalHRPayrollGet | null = null;
  form: FormGroup;
  resignationData!: ResignationGet;
  userDetailAtasan!: UserDetail;
  userDetailResign!: UserDetail;
  idApproval!: number;

  isLoading$ = this.loadingService.loading$;

  constructor(
    private fb: FormBuilder,
    private approvalDepartementService: ApprovalDepartementService,
    private route: ActivatedRoute,
    private loadingService: LoadingService
  ) {
    this.form = this.fb.group({
      softLoan: [''],
      emergencyLoan: [''],
      smartphoneLoan: [''],
      motorLoan: [''],
      umkLoan: [''],
      laptopLoan: [''],
      approvalHRPayrollStatus: [''],
      remarks: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.loadApprovalHRPayroll(id);
      this.idApproval = id;
    });

    this.form.valueChanges.subscribe(() => {
      this.updateApprovalStatus();
    });
  }

  loadApprovalHRPayroll(id: number): void {
    this.approvalDepartementService.getApprovalHRPayrollById(id).subscribe((response: ApiResponse<IApprovalHRPayrollGet>) => {
      this.approvalHRPayrollData = response.data;
      this.userDetailResign = response.data.approvalAtasan?.pengajuanResign?.userDetailResign || {} as UserDetail;
      this.resignationData = response.data.approvalAtasan?.pengajuanResign;

      console.log("full data", response.data);
      console.log("user detail atasan", this.userDetailAtasan);
      console.log("resignation data", this.resignationData);

      this.form.patchValue({
        softLoan: this.approvalHRPayrollData.softLoan,
        emergencyLoan: this.approvalHRPayrollData.emergencyLoan,
        smartphoneLoan: this.approvalHRPayrollData.smartphoneLoan,
        motorLoan: this.approvalHRPayrollData.motorLoan,
        umkLoan: this.approvalHRPayrollData.umkLoan,
        laptopLoan: this.approvalHRPayrollData.laptopLoan,
        approvalHRPayrollStatus: this.approvalHRPayrollData.approvalHRPayrollStatus,
        remarks: this.approvalHRPayrollData.remarks
      });
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const id = this.idApproval;
      const approvalData: IApprovalHRPayrollPost = this.form.value;
      this.approvalDepartementService.putApprovalHRPayrollById(id, approvalData).subscribe(
        response => {
          Swal.fire('Submitted!', 'Pengajuan Resign telah disetujui.', 'success');
        },
        error => {
          Swal.fire('Error!', 'Pastikan semua form terisi selesai/tidak ada jika accept, atau pilih pending', 'error');
        }
      );
    }
  }

  downloadHRPayrollById() {
    let id = this.idApproval;
  
    this.approvalDepartementService.getApprovalHRPayrollFileUrlbyId(id).subscribe((response: HttpResponse<Blob>) => {
      if (response.body) {
        const blob = new Blob([response.body], { type: response.body.type });
        const url = window.URL.createObjectURL(blob);
  
        const a = document.createElement('a');
        a.href = url;
  
        const contentDisposition = response.headers.get('content-disposition');
        const matches = contentDisposition && contentDisposition.match(/filename="([^;]+)"/);
        const filename = (matches && matches[1]) ? matches[1] : 'downloaded-file';
  
        a.download = filename;
        document.body.appendChild(a);
        a.click();
  
        setTimeout(() => {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 0);
      } else {
        console.error('The response body is null.');
      }
    }, error => {
      console.error('Error downloading file:', error);
    });
  }


  updateApprovalStatus(): void {
    const formValues = this.form.value;
  
    const allFinished = [
      formValues.softLoan,
      formValues.emergencyLoan,
      formValues.smartphoneLoan,
      formValues.motorLoan,
      formValues.umkLoan,
      formValues.laptopLoan
    ].every(value => value === 'selesai' || value === 'tidak ada');
  
    const anyPending = [
      formValues.softLoan,
      formValues.emergencyLoan,
      formValues.smartphoneLoan,
      formValues.motorLoan,
      formValues.umkLoan,
      formValues.laptopLoan
    ].some(value => value === 'belum dilakukan');
  
    if (allFinished) {
      this.form.patchValue({ approvalHRPayrollStatus: 'accept' }, { emitEvent: false });
    } else if (anyPending) {
      this.form.patchValue({ approvalHRPayrollStatus: 'pending' }, { emitEvent: false });
    }
  }
  
  


}
