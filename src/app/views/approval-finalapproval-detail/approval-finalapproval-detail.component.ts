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
    base64Image: any;
  
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

          // Load the image and convert to Base64
    this.loadImageToBase64('assets/images/output-onlinepngtools (1).jpg');
    });
  }

  convertImageToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  loadImageToBase64(imagePath: string): void {
    fetch(imagePath)
      .then(response => response.blob())
      .then(blob => this.convertImageToBase64(new File([blob], 'image.jpg')))
      .then(base64 => {
        this.base64Image = base64; // Store the Base64 string for later use
        console.log('Base64 Image:', this.base64Image);
      })
      .catch(error => console.error('Error converting image to Base64:', error));
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
            image: this.base64Image,//please make this content
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