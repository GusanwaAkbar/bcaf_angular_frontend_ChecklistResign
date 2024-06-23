import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApprovalDepartementService } from 'src/app/services/approval-departement-service.service';
import { IApprovalTreasuryGet, IApprovalTreasuryPost } from 'src/app/models/IApprovalTreasury.model';
import { ResignationGet } from 'src/app/models/resignation.model';
import { UserDetail } from 'src/app/models/user-detail';
import { ApiResponse } from 'src/app/models/api-response';

@Component({
  selector: 'app-approval-atasan',
  templateUrl: './approval-treasury-detail.component.html',
  styleUrls: ['./approval-treasury-detail.component.scss']
})
export class ApprovalTreasuryDetailComponent implements OnInit {

  approvalTreasuryData: IApprovalTreasuryGet | null = null;
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
      biayaAdvance: [''],
      blokirFleet: [''],
      approvalTreasuryStatus: [''],
      remarks: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.loadApprovalAtasan(id);
      this.idApproval = id;
    });
  }

  loadApprovalAtasan(id: number): void {
    this.approvalDepartementService.getApprovalTreasuryById(id).subscribe((response: ApiResponse<IApprovalTreasuryGet>) => {
      this.approvalTreasuryData = response.data;
      this.userDetailResign = response.data.approvalAtasan?.pengajuanResign?.userDetailResign || {} as UserDetail;
      this.resignationData = response.data.approvalAtasan?.pengajuanResign

      console.log("full data", response.data);
      console.log("user detail atasan", this.userDetailAtasan);
      console.log("resignation data", this.resignationData);

      this.form.patchValue({
        biayaAdvance: this.approvalTreasuryData.biayaAdvance,
        blokirFleet: this.approvalTreasuryData.blokirFleet,
        approvalTreasuryStatus: this.approvalTreasuryData.approvalTreasuryStatus,
        remarks: this.approvalTreasuryData.remarks
      });
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const id = this.idApproval;
      const approvalData: IApprovalTreasuryPost = this.form.value;
      this.approvalDepartementService.putApprovalTreasuryById(id, approvalData).subscribe(response => {
        // Handle response here
        console.log('Approval submitted:', response);
      });
    }
  }
}
