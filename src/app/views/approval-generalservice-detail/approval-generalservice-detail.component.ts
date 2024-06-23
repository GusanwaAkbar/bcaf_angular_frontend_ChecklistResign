import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApprovalDepartementService } from 'src/app/services/approval-departement-service.service';
import { IApprovalGeneralServiceGet, IApprovalGeneralServicePost } from 'src/app/models/IApprovalGeneralService.model';
import { ResignationGet } from 'src/app/models/resignation.model';
import { UserDetail } from 'src/app/models/user-detail';
import { ApiResponse } from 'src/app/models/api-response';

@Component({
  selector: 'app-approval-general-service',
  templateUrl: './approval-generalservice-detail.component.html',
  styleUrls: ['./approval-generalservice-detail.component.scss']
})
export class ApprovalGeneralServiceDetailComponent implements OnInit {

  approvalGeneralServicesData: IApprovalGeneralServiceGet | null = null;
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
      penutupanPin: [''],
      pengembalianKendaraanDinas: [''],
      inventarisKantor: [''],
      pengembalianAktiva: [''],
      pengembalianKendaraanUMK3: [''],
      approvalGeneralServicesStatus: [''],
      remarks: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.loadApprovalGeneralServices(id);
      this.idApproval = id;
    });
  }

  loadApprovalGeneralServices(id: number): void {
    this.approvalDepartementService.getApprovalGeneralServiceById(id).subscribe((response: ApiResponse<IApprovalGeneralServiceGet>) => {
      this.approvalGeneralServicesData = response.data;
      this.userDetailResign = response.data.approvalAtasan?.pengajuanResign?.userDetailResign || {} as UserDetail;
      this.resignationData = response.data.approvalAtasan?.pengajuanResign;

      console.log("full data", response.data);
      console.log("user detail atasan", this.userDetailAtasan);
      console.log("resignation data", this.resignationData);

      this.form.patchValue({
        penutupanPin: this.approvalGeneralServicesData.penutupanPin,
        pengembalianKendaraanDinas: this.approvalGeneralServicesData.pengembalianKendaraanDinas,
        inventarisKantor: this.approvalGeneralServicesData.inventarisKantor,
        pengembalianAktiva: this.approvalGeneralServicesData.pengembalianAktiva,
        pengembalianKendaraanUMK3: this.approvalGeneralServicesData.pengembalianKendaraanUMK3,
        approvalGeneralServicesStatus: this.approvalGeneralServicesData.approvalGeneralServicesStatus,
        remarks: this.approvalGeneralServicesData.remarks
      });
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const id = this.idApproval;
      const approvalData: IApprovalGeneralServicePost = this.form.value;
      this.approvalDepartementService.putApprovalGeneralServiceById(id, approvalData).subscribe(response => {
        // Handle response here
        console.log('Approval submitted:', response);
      });
    }
  }
}
