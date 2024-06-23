import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApprovalDepartementService } from 'src/app/services/approval-departement-service.service';
import { IApprovalHRTalentGet, IApprovalHRTalentPost } from 'src/app/models/IApprovalHRTalent.model';
import { ResignationGet } from 'src/app/models/resignation.model';
import { UserDetail } from 'src/app/models/user-detail';
import { ApiResponse } from 'src/app/models/api-response';

@Component({
  selector: 'app-approval-hr-talent',
  templateUrl: './approval-hrtalent-detail.component.html',
  styleUrls: ['./approval-hrtalent-detail.component.scss']
})
export class ApprovalHRTalentDetailComponent implements OnInit {

  approvalHRTalentData: IApprovalHRTalentGet | null = null;
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
      pengecekanBiaya: [''],
      approvalHRTalentStatus: [''],
      remarks: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.loadApprovalHRTalent(id);
      this.idApproval = id;
    });
  }

  loadApprovalHRTalent(id: number): void {
    this.approvalDepartementService.getApprovalHRTalentById(id).subscribe((response: ApiResponse<IApprovalHRTalentGet>) => {
      this.approvalHRTalentData = response.data;
      this.userDetailResign = response.data.approvalAtasan?.pengajuanResign?.userDetailResign || {} as UserDetail;
      this.resignationData = response.data.approvalAtasan?.pengajuanResign;

      console.log("full data", response.data);
      console.log("user detail atasan", this.userDetailAtasan);
      console.log("resignation data", this.resignationData);

      this.form.patchValue({
        pengecekanBiaya: this.approvalHRTalentData.pengecekanBiaya,
        approvalHRTalentStatus: this.approvalHRTalentData.approvalHRTalentStatus,
        remarks: this.approvalHRTalentData.remarks
      });
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const id = this.idApproval;
      const approvalData: IApprovalHRTalentPost = this.form.value;
      this.approvalDepartementService.putApprovalHRTalentById(id, approvalData).subscribe(response => {
        // Handle response here
        console.log('Approval submitted:', response);
      });
    }
  }
}
