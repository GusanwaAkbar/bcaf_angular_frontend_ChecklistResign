import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApprovalDepartementService } from 'src/app/services/approval-departement-service.service';
import { IApprovalGeneralServiceGet, IApprovalGeneralServicePost } from 'src/app/models/IApprovalGeneralService.model';
import { ResignationGet } from 'src/app/models/resignation.model';
import { UserDetail } from 'src/app/models/user-detail';
import { ApiResponse } from 'src/app/models/api-response';
import { LoadingService } from 'src/app/services/loading.service';
import Swal from 'sweetalert2';
import { HttpResponse } from '@angular/common/http';

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

  //loading
  isLoading$ = this.loadingService.loading$;

  constructor(
    private fb: FormBuilder,
    private approvalDepartementService: ApprovalDepartementService,
    private loadingService: LoadingService,
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

    this.form.valueChanges.subscribe(() => {
      this.updateApprovalStatus();
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
      this.approvalDepartementService.putApprovalGeneralServiceById(id, approvalData).subscribe(
        response => {
          Swal.fire('Submitted!', 'Pengajuan Resign telah disetujui.', 'success');
        },
        error => {
          Swal.fire('Error!', 'Pastikan semua form terisi selesai/tidak ada jika accept, atau pilih pending', 'error');
        }
      );
    }
  }

  downloadGeneralServiceById() {
    let id = this.idApproval;
  
    this.approvalDepartementService.getApprovalGeneralServiceFileUrlbyId(id).subscribe((response: HttpResponse<Blob>) => {
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
      formValues.penutupanPin,
      formValues.pengembalianKendaraanDinas,
      formValues.inventarisKantor,
      formValues.pengembalianAktiva,
      formValues.pengembalianKendaraanUMK3
    ].every(value => value === 'selesai' || value === 'tidak ada');
  
    const anyPending = [
      formValues.penutupanPin,
      formValues.pengembalianKendaraanDinas,
      formValues.inventarisKantor,
      formValues.pengembalianAktiva,
      formValues.pengembalianKendaraanUMK3
    ].some(value => value === 'belum dilakukan');
  
    if (allFinished) {
      this.form.patchValue({ approvalGeneralServicesStatus: 'accept' }, { emitEvent: false });
    } else if (anyPending) {
      this.form.patchValue({ approvalGeneralServicesStatus: 'pending' }, { emitEvent: false });
    }
  }
  
  

  
}
