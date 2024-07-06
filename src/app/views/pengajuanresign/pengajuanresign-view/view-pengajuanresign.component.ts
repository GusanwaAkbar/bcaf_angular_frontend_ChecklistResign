import { Component, OnInit } from '@angular/core';
import { ResignationService } from '../../../services/resignation.service';
import { ApprovalAtasanService } from 'src/app/services/approval-atasan.service';
import { ApprovalDepartementService } from 'src/app/services/approval-departement-service.service';

@Component({
  selector: 'app-pengajuanresign-form',
  templateUrl: './view-pengajuanresign.component.html',
  styleUrls: ['./view-pengajuanresign.component.scss']
})
export class ViewPengajuanResignComponent implements OnInit {

  resignations: any;
  approvalAtasan: any;
  approvalGeneralServices: any;
  approvalHRIR: any;
  approvalHRLearning: any;
  approvalHRPayroll: any;
  approvalHRServicesAdmin: any;
  approvalHRTalent: any;
  approvalSecurityAdministrator: any;
  approvalTreasury: any;

  constructor(
    private resignationService: ResignationService, 
    private approvalAtasanService: ApprovalAtasanService, 
    private approvalDepartementService: ApprovalDepartementService
  ) {}

  ngOnInit(): void {
    this.resignationService.getResignationByUser().subscribe(response => {
      if (response.success) {
        this.resignations = response.data;
      }
    });

    this.approvalAtasanService.getApprovalAtasanByKaryawan().subscribe(response => {
      if (response.success) {
        this.approvalAtasan = response.data;
        console.log("approval atasan");
        console.log(this.approvalAtasan);
      }
    });

    this.approvalDepartementService.getApprovalGeneralServiceByKaryawan().subscribe(response => {
      if (response.success) {
        this.approvalGeneralServices = response.data;
        console.log("approval general service");
        console.log(this.approvalGeneralServices);
      }
    });

    this.approvalDepartementService.getApprovalHRIRByKaryawan().subscribe(response => {
      if (response.success) {
        this.approvalHRIR = response.data;
        console.log("approval HR IR");
        console.log(this.approvalHRIR);
      }
    });

    this.approvalDepartementService.getApprovalHRLearningByKaryawan().subscribe(response => {
      if (response.success) {
        this.approvalHRLearning = response.data;
        console.log("approval HR Learning");
        console.log(this.approvalHRLearning);
      }
    });

    this.approvalDepartementService.getApprovalHRPayrollByKaryawan().subscribe(response => {
      if (response.success) {
        this.approvalHRPayroll = response.data;
        console.log("approval HR Payroll");
        console.log(this.approvalHRPayroll);
      }
    });

    this.approvalDepartementService.getApprovalHRServiceByKaryawan().subscribe(response => {
      if (response.success) {
        this.approvalHRServicesAdmin = response.data;
        console.log("approval HR Service");
        console.log(this.approvalHRServicesAdmin);
      }
    });

    this.approvalDepartementService.getApprovalHRTalentByKaryawan().subscribe(response => {
      if (response.success) {
        this.approvalHRTalent = response.data;
        console.log("approval HR Talent");
        console.log(this.approvalHRTalent);
      }
    });

    this.approvalDepartementService.getApprovalSecurityAdminByKaryawan().subscribe(response => {
      if (response.success) {
        this.approvalSecurityAdministrator = response.data;
        console.log("approval Security Admin");
        console.log(this.approvalSecurityAdministrator);
      }
    });

    this.approvalDepartementService.getApprovalTreasuryByKaryawan().subscribe(response => {
      if (response.success) {
        this.approvalTreasury = response.data;
        console.log("approval Treasury");
        console.log(this.approvalTreasury);
      }
    });
  }


  getStatusColor(status: string): string {
    switch (status?.toLowerCase()) {
      case 'accept':
        return 'success';
      case 'pending':
        return 'warning';
      case null:
      case undefined:
      case '':
        return 'secondary';
      default:
        return 'secondary'; // atau warna default jika status tidak diketahui
    }
  }


}
