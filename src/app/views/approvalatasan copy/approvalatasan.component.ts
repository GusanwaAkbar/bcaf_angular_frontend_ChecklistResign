import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApprovalAtasanService } from '../../services/approval-atasan.service';
import { ApprovalAtasanGet } from '../../models/approval-atasan';
import { ApprovalAtasanPost } from '../../models/approval-atasan';
import { ResignationGet } from '../../models/resignation.model';
import { UserDetail } from '../../models/user-detail';

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

  pengajuanResignData: ResignationGet | undefined;

  constructor(
    private fb: FormBuilder,
    private approvalAtasanService: ApprovalAtasanService,
    private route: ActivatedRoute
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
  }

  loadApprovalAtasan(id: number): void {
    this.approvalAtasanService.getApprovalAtasanById(id).subscribe((data: ApprovalAtasanGet) => {
      this.approvalAtasanData = data;
      this.resignationData = data.pengajuanResign;
      this.userDetailAtasan = data.userDetailAtasan;
      this.pengajuanResignData = data.pengajuanResign;
      this.userDetailResign = data.pengajuanResign.userDetailResign;

      console.log("full data", data);
      console.log("user detail atasan", this.userDetailAtasan);
      console.log("resignation data", this.resignationData);
      console.log("pengajuan resign data", this.pengajuanResignData);

      

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

  onSubmit(): void {
    if (this.form.valid) {

      let id = this.idApproval

      const approvalData: ApprovalAtasanPost = this.form.value;
      this.approvalAtasanService.submitApproval(id, approvalData).subscribe(response => {
        // Handle response here
        console.log('Approval submitted:', response);
      });
    }
  }
}
