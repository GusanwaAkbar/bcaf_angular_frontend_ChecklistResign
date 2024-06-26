import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApprovalDepartementService } from 'src/app/services/approval-departement-service.service';
import { IApprovalHRServiceGet, IApprovalHRServicePost } from 'src/app/models/IApprovalHRService.model';
import { ResignationGet } from 'src/app/models/resignation.model';
import { UserDetail } from 'src/app/models/user-detail';
import { ApiResponse } from 'src/app/models/api-response';

@Component({
  selector: 'app-approval-hr-services',
  templateUrl: './approval-hrservice-detail.component.html',
  styleUrls: ['./approval-hrservice-detail.component.scss']
})
export class ApprovalHRServiceDetailComponent implements OnInit {

  approvalHRServicesData: IApprovalHRServiceGet | null = null;
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
      excessOfClaim: [''],
      penyelesaianBiayaHR: [''],
      penonaktifanKartuElektronik: [''],
      approvalHRServicesAdminStatus: [''],
      remarks: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.loadApprovalHRServices(id);
      this.idApproval = id;
    });
  }

  loadApprovalHRServices(id: number): void {
    this.approvalDepartementService.getApprovalHRServiceById(id).subscribe((response: ApiResponse<IApprovalHRServiceGet>) => {
      this.approvalHRServicesData = response.data;
      this.userDetailResign = response.data.approvalAtasan?.pengajuanResign?.userDetailResign || {} as UserDetail;
      this.resignationData = response.data.approvalAtasan?.pengajuanResign;

      console.log("full data", response.data);
      console.log("user detail atasan", this.userDetailAtasan);
      console.log("resignation data", this.resignationData);

      this.form.patchValue({
        excessOfClaim: this.approvalHRServicesData.excessOfClaim,
        penyelesaianBiayaHR: this.approvalHRServicesData.penyelesaianBiayaHR,
        penonaktifanKartuElektronik: this.approvalHRServicesData.penonaktifanKartuElektronik,
        approvalHRServicesAdminStatus: this.approvalHRServicesData.approvalHRServicesAdminStatus,
        remarks: this.approvalHRServicesData.remarks
      });
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const id = this.idApproval;
      const approvalData: IApprovalHRServicePost = this.form.value;
      this.approvalDepartementService.putApprovalHRServiceById(id, approvalData).subscribe(response => {
        // Handle response here
        console.log('Approval submitted:', response);
      });
    }
  }
}
