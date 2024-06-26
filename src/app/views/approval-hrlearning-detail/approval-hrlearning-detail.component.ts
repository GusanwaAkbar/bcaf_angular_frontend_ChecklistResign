import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApprovalDepartementService } from 'src/app/services/approval-departement-service.service';
import { ApiResponse } from 'src/app/models/api-response';
import { ResignationGet } from 'src/app/models/resignation.model';
import { UserDetail } from 'src/app/models/user-detail';

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

  constructor(
    private fb: FormBuilder,
    private approvalDepartementService: ApprovalDepartementService,
    private route: ActivatedRoute
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
      this.approvalDepartementService.putApprovalHRLearningById(id, approvalData).subscribe(response => {
        // Handle response here
        console.log('Approval submitted:', response);
      });
    }
  }
}
