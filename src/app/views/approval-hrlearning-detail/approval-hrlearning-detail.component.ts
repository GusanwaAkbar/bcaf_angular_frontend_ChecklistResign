import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, LoadChildren } from '@angular/router';
import { ApprovalDepartementService } from 'src/app/services/approval-departement-service.service';
import { ApiResponse } from 'src/app/models/api-response';
import { ResignationGet } from 'src/app/models/resignation.model';
import { UserDetail } from 'src/app/models/user-detail';
import { LoadingService } from 'src/app/services/loading.service';
import Swal from 'sweetalert2';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-approval-hr-learning',
  templateUrl: './approval-hrlearning-detail.component.html',
  styleUrls: ['./approval-hrlearning-detail.component.scss']
})
export class ApprovalHRLearningDetailComponent implements OnInit {

  approvalHRLearningData: any | null = null;
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
      pengecekanBiayaTraining: [''],
      approvalHRLearningStatus: [''],
      remarks: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.loadApprovalHRLearning(id);
      this.idApproval = id;
    });
  }

  loadApprovalHRLearning(id: number): void {
    this.approvalDepartementService.getApprovalHRLearningById(id).subscribe((response: ApiResponse<any>) => {
      this.approvalHRLearningData = response.data;
      this.userDetailResign = this.approvalHRLearningData.approvalAtasan?.pengajuanResign?.userDetailResign || {} as UserDetail;
      this.resignationData = this.approvalHRLearningData.approvalAtasan?.pengajuanResign;

      console.log("full data", response.data);
      console.log("user detail atasan", this.userDetailAtasan);
      console.log("resignation data", this.resignationData);

      this.form.patchValue({
        pengecekanBiayaTraining: this.approvalHRLearningData.pengecekanBiayaTraining,
        approvalHRLearningStatus: this.approvalHRLearningData.approvalHRLearningStatus,
        remarks: this.approvalHRLearningData.remarks
      });
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const id = this.idApproval;
      const approvalData = this.form.value;
      this.approvalDepartementService.putApprovalHRLearningById(id, approvalData).subscribe(
        response => {
          Swal.fire('Submitted!', 'Pengajuan Resign telah disetujui.', 'success');
        },
        error => {
          Swal.fire('Error!', 'Pastikan semua form terisi selesai/tidak ada jika accept, atau pilih pending', 'error');
        }
      );
    }
  }

  
  downloadHRLearningById() {
    let id = this.idApproval;
  
    this.approvalDepartementService.getApprovalHRLearningFileUrlbyId(id).subscribe((response: HttpResponse<Blob>) => {
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
  

}
