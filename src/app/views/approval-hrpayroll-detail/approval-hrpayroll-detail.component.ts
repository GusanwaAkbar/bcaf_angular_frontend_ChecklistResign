import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApprovalDepartementService } from 'src/app/services/approval-departement-service.service';
import { IApprovalHRPayrollGet, IApprovalHRPayrollPost } from 'src/app/models/IApprovalHRPayroll.model';
import { ResignationGet } from 'src/app/models/resignation.model';
import { UserDetail } from 'src/app/models/user-detail';
import { ApiResponse } from 'src/app/models/api-response';

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

  constructor(
    private fb: FormBuilder,
    private approvalDepartementService: ApprovalDepartementService,
    private route: ActivatedRoute
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
      this.approvalDepartementService.putApprovalHRPayrollById(id, approvalData).subscribe(response => {
        // Handle response here
        console.log('Approval submitted:', response);
      });
    }
  }
}
