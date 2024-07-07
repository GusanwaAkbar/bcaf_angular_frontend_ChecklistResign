import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApprovalDepartementService } from 'src/app/services/approval-departement-service.service';
import { IApprovalSecurityAdminGet, IApprovalSecurityAdminPost } from 'src/app/models/IApprovalSecurityAdmin.model';
import { ResignationGet } from 'src/app/models/resignation.model';
import { UserDetail } from 'src/app/models/user-detail';
import { ApiResponse } from 'src/app/models/api-response';
import { LoadingService } from 'src/app/services/loading.service';
import Swal from 'sweetalert2';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-approval-security-admin',
  templateUrl: './approval-securityadmin-detail.component.html',
  styleUrls: ['./approval-securityadmin-detail.component.scss']
})
export class ApprovalSecurityAdminDetailComponent implements OnInit {

  approvalSecurityAdminData: IApprovalSecurityAdminGet | null = null;
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
      permohonanPenutupanUser: [''],
      penutupanEmailBCA: [''],
      pengembalianToken: [''],
      approvalSecurityAdministratorStatus: [''],
      remarks: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.loadApprovalSecurityAdmin(id);
      this.idApproval = id;
    });
  }

  loadApprovalSecurityAdmin(id: number): void {
    this.approvalDepartementService.getApprovalSecurityAdminById(id).subscribe((response: ApiResponse<IApprovalSecurityAdminGet>) => {
      this.approvalSecurityAdminData = response.data;
      this.userDetailResign = response.data.approvalAtasan?.pengajuanResign?.userDetailResign || {} as UserDetail;
      this.resignationData = response.data.approvalAtasan?.pengajuanResign;

      console.log("full data", response.data);
      console.log("user detail atasan", this.userDetailAtasan);
      console.log("resignation data", this.resignationData);

      this.form.patchValue({
        permohonanPenutupanUser: this.approvalSecurityAdminData.permohonanPenutupanUser,
        penutupanEmailBCA: this.approvalSecurityAdminData.penutupanEmailBCA,
        pengembalianToken: this.approvalSecurityAdminData.pengembalianToken,
        approvalSecurityAdministratorStatus: this.approvalSecurityAdminData.approvalSecurityAdministratorStatus,
        remarks: this.approvalSecurityAdminData.remarks
      });
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const id = this.idApproval;
      const approvalData: IApprovalSecurityAdminPost = this.form.value;

      console.log("form value")
      console.log(this.form.value)

      this.approvalDepartementService.putApprovalSecurityAdminById(id, approvalData).subscribe(
        response => {
          Swal.fire('Submitted!', 'Pengajuan Resign telah disetujui.', 'success');
        },
        error => {
          Swal.fire('Error!', 'Pastikan semua form terisi selesai/tidak ada jika accept, atau pilih pending', 'error');
        }
      );
    }
  }


  downloadSecurityAdminById() {
    let id = this.idApproval;
  
    this.approvalDepartementService.getApprovalSecurityAdminFileUrlbyId(id).subscribe((response: HttpResponse<Blob>) => {
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
