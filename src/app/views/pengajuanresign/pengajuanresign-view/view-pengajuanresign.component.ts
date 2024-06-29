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
  approvalGeneralService: any;
  approvalHRIR: any;
  approvalHRLearning: any;
  approvalHRPayroll: any;
  approvalHRService: any;
  approvalHRTalent: any;
  approvalSecurityAdmin: any;
  approvalTreasury: any;

  constructor(
    private resignationService: ResignationService, 
    private approvalAtasanService: ApprovalAtasanService, 
    private approvalDepartementService: ApprovalDepartementService
  ) {}

  ngOnInit(): void {
    this.resignationService.getResignation().subscribe(response => {
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
        this.approvalGeneralService = response.data;
        console.log("approval general service");
        console.log(this.approvalGeneralService);
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
        this.approvalHRService = response.data;
        console.log("approval HR Service");
        console.log(this.approvalHRService);
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
        this.approvalSecurityAdmin = response.data;
        console.log("approval Security Admin");
        console.log(this.approvalSecurityAdmin);
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
}
