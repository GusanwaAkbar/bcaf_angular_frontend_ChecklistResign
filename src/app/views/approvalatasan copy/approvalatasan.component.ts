import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApprovalAtasanService } from '../../services/approval-atasan.service';
import { ApprovalAtasanGet } from '../../models/approval-atasan';
import { ApprovalAtasanPost } from '../../models/approval-atasan';
import { ResignationGet } from '../../models/resignation.model';
import { UserDetail } from '../../models/user-detail';
import { LoadingService } from 'src/app/services/loading.service';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';


@Component({
  selector: 'app-approval-atasan',
  templateUrl: './approvalatasan.component.html',
  styleUrls: ['./approvalatasan.component.scss']
})
export class ApprovalAtasanComponent implements OnInit {

  approvalAtasanData: ApprovalAtasanGet | null = null;
  form: FormGroup;
  resignationData!: ResignationGet;
  userDetailAtasan!: UserDetail;
  userDetailResign!: UserDetail;
  idApproval!: number;

  @BlockUI() blockUI!: NgBlockUI;

  isLoading$ = this.loadingService.loading$;

  pengajuanResignData: ResignationGet | undefined;

  constructor(
    private fb: FormBuilder,
    private approvalAtasanService: ApprovalAtasanService,
    private route: ActivatedRoute,
    private loadingService: LoadingService
  ) {
    this.form = this.fb.group({
      serahTerimaTugas: [''],
      pengembalianNotebook: [''],
      pengembalianKunciLoker: [''],
      pengembalianKunciRuangan: [''],
      penyerahanSuratPengunduranDiri: [''],
      pengembalianIdCard: [''],
      hapusAplikasiMobile: [''],
      uninstallSoftwareNotebook: [''],
      uninstallSoftwareUnitKerja: [''],
      approvalStatusAtasan: [''],
      remarksAtasan: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.loadApprovalAtasan(id);
      this.idApproval = +params['id'];
    });

    // Listen to form changes
    this.form.valueChanges.subscribe(() => {
      this.updateApprovalStatus();
    });

    
  }

  loadApprovalAtasan(id: number): void {
    this.approvalAtasanService.getApprovalAtasanById(id).subscribe((data: ApprovalAtasanGet) => {
      this.approvalAtasanData = data;
      this.resignationData = data.pengajuanResign;
      this.userDetailAtasan = data.userDetailAtasan;
      this.pengajuanResignData = data.pengajuanResign;
      this.userDetailResign = data.pengajuanResign.userDetailResign;

      this.form.patchValue({
        serahTerimaTugas: data.serahTerimaTugas,
        pengembalianNotebook: data.pengembalianNotebook,
        pengembalianKunciLoker: data.pengembalianKunciLoker,
        pengembalianKunciRuangan: data.pengembalianKunciRuangan,
        penyerahanSuratPengunduranDiri: data.penyerahanSuratPengunduranDiri,
        pengembalianIdCard: data.pengembalianIdCard,
        hapusAplikasiMobile: data.hapusAplikasiMobile,
        uninstallSoftwareNotebook: data.uninstallSoftwareNotebook,
        uninstallSoftwareUnitKerja: data.uninstallSoftwareUnitKerja,
        approvalStatusAtasan: data.approvalStatusAtasan,
        remarksAtasan: data.remarksAtasan
      });
    });
  }

  updateApprovalStatus(): void {
    const formValues = this.form.value;

    const allFinished = [
      formValues.serahTerimaTugas,
      formValues.pengembalianNotebook,
      formValues.pengembalianKunciLoker,
      formValues.pengembalianKunciRuangan,
      formValues.penyerahanSuratPengunduranDiri,
      formValues.pengembalianIdCard,
      formValues.hapusAplikasiMobile,
      formValues.uninstallSoftwareNotebook,
      formValues.uninstallSoftwareUnitKerja
    ].every(value => value === 'selesai' || value === 'tidak ada');

    const anyPending = [
      formValues.serahTerimaTugas,
      formValues.pengembalianNotebook,
      formValues.pengembalianKunciLoker,
      formValues.pengembalianKunciRuangan,
      formValues.penyerahanSuratPengunduranDiri,
      formValues.pengembalianIdCard,
      formValues.hapusAplikasiMobile,
      formValues.uninstallSoftwareNotebook,
      formValues.uninstallSoftwareUnitKerja
    ].some(value => value === 'belum dilakukan');

    if (allFinished) {
      this.form.patchValue({ approvalStatusAtasan: 'accept' }, { emitEvent: false });
    } else if (anyPending) {
      this.form.patchValue({ approvalStatusAtasan: 'pending' }, { emitEvent: false });
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const id = this.idApproval;
      const approvalData: ApprovalAtasanPost = this.form.value;
      this.approvalAtasanService.submitApproval(id, approvalData).subscribe(
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
