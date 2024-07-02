import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApprovalDepartementService } from '../../services/approval-departement-service.service';
import { IApprovalHRIRGet, IApprovalHRIRPost } from '../../models/IApprovalHRIR.model';
import { ResignationGet } from '../../models/resignation.model';
import { UserDetail } from '../../models/user-detail';
import { ApiResponse } from '../../models/api-response';
import { LoadingService } from 'src/app/services/loading.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-approval-hr-ir',
  templateUrl: './approval-hrir-detail.component.html',
  styleUrls: ['./approval-hrir-detail.component.scss']
})
export class ApprovalHRIRDetailComponent implements OnInit {

  approvalHRIRData: IApprovalHRIRGet | null = null;
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
      exitInterview: [''],
      approvalHRIRStatus: [''],
      remarks: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.loadApprovalHRIR(id);
      this.idApproval = id;
    });
  }

  loadApprovalHRIR(id: number): void {
    this.approvalDepartementService.getApprovalHRIRById(id).subscribe((response: ApiResponse<IApprovalHRIRGet>) => {
      this.approvalHRIRData = response.data;
      this.userDetailResign = response.data.approvalAtasan?.pengajuanResign?.userDetailResign || {} as UserDetail;
      this.resignationData = response.data.approvalAtasan?.pengajuanResign;

      console.log("full data", response.data);
      console.log("user detail atasan", this.userDetailAtasan);
      console.log("resignation data", this.resignationData);

      this.form.patchValue({
        exitInterview: this.approvalHRIRData.exitInterview,
        approvalHRIRStatus: this.approvalHRIRData.approvalHRIRStatus,
        remarks: this.approvalHRIRData.remarks
      });
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const id = this.idApproval;
      const approvalData: IApprovalHRIRPost = this.form.value;

      console.log("form value")
      console.log(this.form.value)

      console.log("approval Data")
      console.log(approvalData)

      this.approvalDepartementService.putApprovalHRIRById(id, approvalData).subscribe(
        response => {
          Swal.fire('Submitted!', 'Pengajuan Resign telah disetujui.', 'success');
        },
        error => {
          Swal.fire('Error!', 'Pastikan semua form terisi selesai/tidak ada jika accept, atau pilih pending', 'error');
        }
      );
    }
  }
}
