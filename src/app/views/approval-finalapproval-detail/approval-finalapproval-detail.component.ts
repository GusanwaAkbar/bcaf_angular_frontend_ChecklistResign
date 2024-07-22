import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApprovalDepartementService } from 'src/app/services/approval-departement-service.service';
import { ApiResponse } from 'src/app/models/api-response';
import { UserDetail } from 'src/app/models/user-detail';
import { ApprovalAtasanGet } from 'src/app/models/approval-atasan';
import { LoadingService } from 'src/app/services/loading.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Content, StyleDictionary, TDocumentDefinitions, TableCell } from 'pdfmake/interfaces';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-final-approval',
  templateUrl: './approval-finalapproval-detail.component.html',
  styleUrls: ['./approval-finalapproval-detail.component.scss']
})
export class ApprovalFinalApprovalDetailComponent implements OnInit {

  approvalData: any;
  userDetailResign: UserDetail | null = null;
  userDetailAtasan: UserDetail | null = null;
  approvalAtasanData: ApprovalAtasanGet | undefined 
  form: FormGroup ;
  idFinalApproval!: number;

  //Approval atasan
  approvalAtasan: any;
  approvalGeneralService: any;
  approvalHRIR: any;
  approvalHRTalent:any;
  approvalHRLearning: any;
  approvalHRPayroll: any;
  approvalHRServicesAdmin: any;
  approvalSecurityAdministrator:any;
  approvalTreasury: any;

    //loading
  isLoading$ = this.loadingService.loading$;

  

  constructor(
    private fb: FormBuilder,
    private approvalDepartementService: ApprovalDepartementService,
    private loadingService: LoadingService,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      remarks: [''],
      finalApprovalStatus: [''],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.idFinalApproval = id;
      this.loadFinalApproval(id);
    });
  }

  loadFinalApproval(id: number): void {
    this.approvalDepartementService.getApprovalFinalApprovalById(id).subscribe((response: ApiResponse<any>) => {
      this.approvalData = response.data;
      let responseData = this.approvalData;

      this.userDetailResign = responseData.userDetailResign;
      this.userDetailAtasan = responseData.userDetailAtasan;
      this.approvalAtasanData = responseData.approvalAtasan;


      console.log("finalresponsedata")
      console.log(responseData)

      //fetch approvals data
      this.approvalGeneralService = responseData.approvalGeneralServices;
      this.approvalAtasan = responseData.approvalAtasan;
      this.approvalHRIR = responseData.approvalHRIR;
      this.approvalHRLearning = responseData.approvalHRLearning;
      this.approvalHRPayroll = responseData.approvalHRPayroll;
      this.approvalHRServicesAdmin = responseData.approvalHRServicesAdmin;
      this.approvalSecurityAdministrator = responseData.approvalSecurityAdministrator;
      this.approvalTreasury = responseData.approvalTreasury;
      this.approvalHRTalent = responseData.approvalHRTalent;
      
      console.log("hrir")
      console.log(this.approvalHRIR)


      console.log("hr talent")
      console.log(this.approvalHRTalent)

      console.log("Full Approval Data:", this.approvalData);

      this.form.patchValue({
        remarks: this.approvalData.remarks,
        finalApprovalStatus: this.approvalData.finalApprovalStatus
      });

      
      
    });
  }


  onSubmit(): void {
    if (this.form.valid) {
      const id = this.idFinalApproval;
      const approvalData: any = this.form.value;
      this.approvalDepartementService.putApprovalFinalApprovalById(id, approvalData).subscribe(
        response => {
          Swal.fire('Submitted!', 'Pengajuan Resign telah disetujui.', 'success');
        },
        error => {
          Swal.fire('Error!', 'Pastikan semua form terisi selesai/tidak ada jika accept, atau pilih pending', 'error');
        }
      );
    }
  }



  
      generatePDF() {
        if (!this.approvalData) {
          console.error('Approval data is not loaded');
          return;
        }
      
        const formatDate = (dateString: string): string => {
          const date = new Date(dateString);
          return date.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
          });
        };
      
          
        const fieldMapping: { [key: string]: string } = {
          penutupanPin: 'Pengajuan Penutupan Pin',
          serahTerimaTugas: 'Serah Terima Tugas',
          pengembalianNotebook: 'Pengembalian Notebook',
          pengembalianKunciLoker: 'Pengembalian Kunci Loker',
          pengembalianKunciRuangan: 'Pengembalian Kunci Ruangan',
          penyerahanSuratPengunduranDiri: 'Penyerahan Surat Pengunduran Diri',
          pengembalianIdCard: 'Pengembalian ID Card',
          hapusAplikasiMobile: 'Hapus Aplikasi Mobile',
          uninstallSoftwareNotebook: 'Uninstall Software Notebook',
          uninstallSoftwareUnitKerja: 'Uninstall Software Unit Kerja',
          approvalStatusAtasan: 'Approval Status Atasan',
          remarksAtasan: 'Remarks Atasan',
          pengembalianKendaraanDinas: 'Pengembalian Kendaraan Dinas',
          inventarisKantor: 'Inventaris Kantor',
          pengembalianAktiva: 'Pengembalian Aktiva',
          pengembalianKendaraanUMK3: 'Pengembalian Kendaraan UMK3',
          approvalGeneralServicesStatus: 'Approval General Services Status',
          exitInterview: 'Exit Interview',
          approvalHRIRStatus: 'Approval HR IR Status',
          pengecekanBiayaTraining: 'Pengecekan Biaya Training',
          approvalHRLearningStatus: 'Approval HR Learning Status',
          softLoan: 'Soft Loan',
          emergencyLoan: 'Emergency Loan',
          smartphoneLoan: 'Smartphone Loan',
          motorLoan: 'Motor Loan',
          umkLoan: 'UMK Loan',
          laptopLoan: 'Laptop Loan',
          approvalHRPayrollStatus: 'Approval HR Payroll Status',
          excessOfClaim: 'Excess Of Claim',
          penyelesaianBiayaHR: 'Penyelesaian Biaya HR',
          penonaktifanKartuElektronik: 'Penonaktifan Kartu Elektronik',
          approvalHRServicesAdminStatus: 'Approval HR Services Admin Status',
          pengecekanBiaya: 'Pengecekan Biaya',
          approvalHRTalentStatus: 'Approval HR Talent Status',
          permohonanPenutupanUser: 'Permohonan Penutupan User',
          penutupanEmailBCA: 'Penutupan Email BCA',
          pengembalianToken: 'Pengembalian Token',
          approvalSecurityAdministratorStatus: 'Approval Security Administrator Status',
          biayaAdvance: 'Biaya Advance',
          blokirFleet: 'Blokir Fleet',
          approvalTreasuryStatus: 'Approval Treasury Status',
        };
      
        const createApprovalTable = (title: string, data: any): Content[] => {
          const tableBody: TableCell[][] = [
            [{ text: 'Field', style: 'tableHeader' }, { text: 'Value', style: 'tableHeader' }],
            ...Object.entries(data)
              .filter(([key]) => !['id', 'createdDate', 'documentPath'].includes(key))
              .map(([key, value]) => [
                { text: fieldMapping[key] || key },
                { text: key.toLowerCase().includes('date') ? formatDate(value as string) : value }
              ])
          ];
      
          return [
            { text: title, style: 'subheader' },
            {
              table: {
                headerRows: 1,
                widths: ['*', '*'],
                body: tableBody
              },
              layout: 'lightHorizontalLines'
            },
            { text: '\n' }
          ];
        };
      
        const page1Content: Content[] = [
          {
            image: 'data:image/png;base64,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',
            width: 175,
            alignment: 'left',
            margin: [0, 0, 0, 20]
          },
          { text: 'Checklist Karyawan Resign', style: 'header' },
          { text: '\n' },
          {
            columns: [
              {
                width: '50%',
                text: [
                  { text: 'Resigning Employee\n', style: 'subheader' },
                  `Name: ${this.userDetailResign?.nama}\n`,
                  `Email: ${this.userDetailResign?.email}\n`,
                  `Branch: ${this.userDetailResign?.cabang}\n`,
                  `Division: ${this.userDetailResign?.divisi}\n`,
                  `Position: ${this.userDetailResign?.jabatan}\n`,
                ]
              },
              {
                width: '50%',
                text: [
                  { text: 'Manager\n', style: 'subheader' },
                  `Name: ${this.userDetailAtasan?.nama}\n`,
                  `Email: ${this.userDetailAtasan?.email}\n`,
                  `Branch: ${this.userDetailAtasan?.cabang}\n`,
                  `Division: ${this.userDetailAtasan?.divisi}\n`,
                  `Position: ${this.userDetailAtasan?.jabatan}\n`,
                ]
              }
            ]
          },
          { text: '\n' },
          { text: 'Resignation Details', style: 'subheader' },
          {
            ul: [
              `HRIS Account Creation Date: ${formatDate(this.approvalData.pengajuanResign.tanggalPembuatanAkunHRIS)}`,
              `Last Working Date: ${formatDate(this.approvalData.pengajuanResign.tanggalBerakhirBekerja)}`,
              `Approved Date: ${formatDate(this.approvalData.pengajuanResign.approvedDate)}`,
              `Approved By: ${this.approvalData.pengajuanResign.approvedBy}`,
            ]
          },
          { text: '\n' },
          { text: 'Approvals Departement', style: 'subheader' },
          {
            table: {
              headerRows: 1,
              widths: ['*', '*', '*', '*'],
              body: [
                [
                  { text: 'Department', style: 'tableHeader' },
                  { text: 'Status', style: 'tableHeader' },
                  { text: 'Approved By', style: 'tableHeader' },
                  { text: 'Approved Date', style: 'tableHeader' }
                ],
                ['Manager', this.approvalAtasan.approvalStatusAtasan, this.approvalAtasan.approvedBy, formatDate(this.approvalAtasan.approvedDate)],
                ['General Services', this.approvalGeneralService.approvalGeneralServicesStatus, this.approvalGeneralService.approvedBy, formatDate(this.approvalGeneralService.approvedDate)],
                ['HR IR', this.approvalHRIR.approvalHRIRStatus, this.approvalHRIR.approvedBy, formatDate(this.approvalHRIR.approvedDate)],
                ['HR Learning', this.approvalHRLearning.approvalHRLearningStatus, this.approvalHRLearning.approvedBy, formatDate(this.approvalHRLearning.approvedDate)],
                ['HR Payroll', this.approvalHRPayroll.approvalHRPayrollStatus, this.approvalHRPayroll.approvedBy, formatDate(this.approvalHRPayroll.approvedDate)],
                ['HR Services Admin', this.approvalHRServicesAdmin.approvalHRServicesAdminStatus, this.approvalHRServicesAdmin.approvedBy, formatDate(this.approvalHRServicesAdmin.approvedDate)],
                ['HR Talent', this.approvalHRTalent.approvalHRTalentStatus, this.approvalHRTalent.approvedBy, formatDate(this.approvalHRTalent.approvedDate)],
                ['Security Administrator', this.approvalSecurityAdministrator.approvalSecurityAdministratorStatus, this.approvalSecurityAdministrator.approvedBy, formatDate(this.approvalSecurityAdministrator.approvedDate)],
                ['Treasury', this.approvalTreasury.approvalTreasuryStatus, this.approvalTreasury.approvedBy, formatDate(this.approvalTreasury.approvedDate)],
              ]
            }
          },
          { text: '\n' },
          { text: `Final Approval Status: ${this.approvalData.finalApprovalStatus}`, style: 'subheader' },
          { text: `Remarks: ${this.approvalData.remarks}` },
        ];
      
        const page2Content: Content[] = [
          { text: 'Detailed Approval Information', style: 'header', pageBreak: 'before' },
          ...createApprovalTable('Manager Approval', this.approvalAtasan),
          ...createApprovalTable('General Services Approval', this.approvalGeneralService),
          ...createApprovalTable('HR IR Approval', this.approvalHRIR),
          ...createApprovalTable('HR Learning Approval', this.approvalHRLearning),
          ...createApprovalTable('HR Payroll Approval', this.approvalHRPayroll),
          ...createApprovalTable('HR Services Admin Approval', this.approvalHRServicesAdmin),
          ...createApprovalTable('HR Talent Approval', this.approvalHRTalent),
          ...createApprovalTable('Security Administrator Approval', this.approvalSecurityAdministrator),
          ...createApprovalTable('Treasury Approval', this.approvalTreasury),
        ];
      
        const docDefinition: TDocumentDefinitions = {
          pageSize: 'FOLIO',
          pageMargins: [40,60], // Adding left and right margins
          content: [...page1Content, ...page2Content],
          styles: {
            header: {
              fontSize: 18,
              bold: true,
              alignment: 'center',
              margin: [0, 0, 0, 20]
            },
            subheader: {
              fontSize: 14,
              bold: true,
              margin: [0, 10, 0, 5]
            },
            tableHeader: {
              bold: true,
              fillColor: '#eeeeee',
              margin: [0, 5, 0, 5]
            }
          } as StyleDictionary
        };
      
        pdfMake.createPdf(docDefinition).open();
      }
  

}
