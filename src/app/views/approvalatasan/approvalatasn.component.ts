// src/app/components/approval-atasan/approval-atasan.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApprovalAtasanService } from '../../services/approval-atasan.service'
import { ApprovalAtasanGet } from '../../models/approval-atasan';
import { ApprovalAtasanPost } from '../../models/approval-atasan';
import { Resignation, ResignationGet } from 'src/app/models/resignation.model';
import { UserDetail } from 'src/app/models/user-detail';

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



  pengajuanResignData: ResignationGet | undefined

  constructor(private fb: FormBuilder, private approvalAtasanService: ApprovalAtasanService) {
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
    
    //get data for approvalatasan get
    this.approvalAtasanService.getApprovalAtasanState().subscribe((data: ApprovalAtasanGet) => {
      this.approvalAtasanData = data;


      this.resignationData = data.pengajuanResign;
      this.userDetailAtasan = data.userDetailAtasan;

      this.pengajuanResignData = data.pengajuanResign;

      this.userDetailResign = data.pengajuanResign.userDetailResign;

      

      console.log("full data")
      console.log(data)

      console.log("user detail atasana")
      console.log(this.userDetailAtasan)

      console.log("data reign")
      console.log(this.resignationData)

      console.log("data pegngajuan")
      console.log(data.pengajuanResign)
      
    });


    // Get data initial value for form

  }

  onSubmit(): void {
    if (this.form.valid) {
      const approvalData: ApprovalAtasanPost = this.form.value;
      this.approvalAtasanService.submitApproval(approvalData).subscribe(response => {
        // Handle response here
        console.log('Approval submitted:', response);
      });
    }
  }
}
