import { Component, OnInit } from '@angular/core';
import { ResignationService } from '../../../services/resignation.service';
import { ApprovalAtasanService } from '../../../services/approval-atasan.service';
import { ApprovalDepartementService } from '../../../services/approval-departement-service.service';
import { HttpResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pengajuanresign-form',
  templateUrl: './pengajuanresign-detail.component.html',
  styleUrls: ['./pengajuanresign-detail.component.scss']
})
export class PengajuanResignDetailComponent implements OnInit {

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
  selectedFiles: { [key: string]: File } = {};
  nipKaryawan: any;

  constructor(
    private route: ActivatedRoute,
    private resignationService: ResignationService, 
    private approvalAtasanService: ApprovalAtasanService, 
    private approvalDepartementService: ApprovalDepartementService
  ) {}

  ngOnInit(): void {

    this.nipKaryawan = this.route.snapshot.paramMap.get('nipKaryawan');

    console.log("nip KAryawaaannn", this.nipKaryawan)

    this.resignationService.getResignationByNipKaryawan(this.nipKaryawan).subscribe(response => {
      if (response.success) {
        this.resignations = response.data;
      }
    });

    this.approvalDepartementService.getApprovalAtasanByNip(this.nipKaryawan).subscribe(response => {
      if (response.success) {
        this.approvalAtasan = response.data;
      }
    });

    this.approvalDepartementService.getApprovalGeneralServicesByNip(this.nipKaryawan).subscribe(response => {
      if (response.success) {
        this.approvalGeneralServices = response.data;
      }
    });

    this.approvalDepartementService.getApprovalHRIRByNip(this.nipKaryawan).subscribe(response => {
      if (response.success) {
        this.approvalHRIR = response.data;
      }
    });

    this.approvalDepartementService.getApprovalHRLearningByNip(this.nipKaryawan).subscribe(response => {
      if (response.success) {
        this.approvalHRLearning = response.data;
      }
    });

    this.approvalDepartementService.getApprovalHRPayrollByNip(this.nipKaryawan).subscribe(response => {
      if (response.success) {
        this.approvalHRPayroll = response.data;
      }
    });

    this.approvalDepartementService.getApprovalHRServicesAdminByNip(this.nipKaryawan).subscribe(response => {
      if (response.success) {
        this.approvalHRServicesAdmin = response.data;
      }
    });

    this.approvalDepartementService.getApprovalHRTalentByNip(this.nipKaryawan).subscribe(response => {
      if (response.success) {
        this.approvalHRTalent = response.data;
      }
    });

    this.approvalDepartementService.getApprovalSecurityAdministratorByNip(this.nipKaryawan).subscribe(response => {
      if (response.success) {
        this.approvalSecurityAdministrator = response.data;
      }
    });

    this.approvalDepartementService.getApprovalTreasuryByNip(this.nipKaryawan).subscribe(response => {
      if (response.success) {
        this.approvalTreasury = response.data;
      }
    });
  }

  onFileSelected(event: any, department: string): void {
    this.selectedFiles[department] = event.target.files[0];
  }

  uploadApprovalGeneralServicesDocument(): void {
    const file = this.selectedFiles['approvalGeneralServices'];
    if (!file) {
      alert('Please select a file first.');
      return;
    }
    this.approvalDepartementService.postApprovalGeneralServiceDocument(file).subscribe(
      response => {
        console.log(response);
        Swal.fire('Success', 'File uploaded successfully!', 'success');
      },
      error => console.error(error)
    );
  }

  uploadApprovalHRIRDocument(): void {
    const file = this.selectedFiles['approvalHRIR'];
    if (!file) {
      alert('Please select a file first.');
      return;
    }
    this.approvalDepartementService.postApprovalHRIRDocument(file).subscribe(
      response => {
        console.log(response);
        Swal.fire('Success', 'File uploaded successfully!', 'success');
      },
      error => console.error(error)
    );
  }

  uploadApprovalHRLearningDocument(): void {
    const file = this.selectedFiles['approvalHRLearning'];
    if (!file) {
      alert('Please select a file first.');
      return;
    }
    this.approvalDepartementService.postApprovalHRLearningDocument(file).subscribe(
      response => {
        console.log(response);
        Swal.fire('Success', 'File uploaded successfully!', 'success');
      },
      error => console.error(error)
    );
  }

  uploadApprovalHRPayrollDocument(): void {
    const file = this.selectedFiles['approvalHRPayroll'];
    if (!file) {
      alert('Please select a file first.');
      return;
    }
    this.approvalDepartementService.postApprovalHRPayrollDocument(file).subscribe(
      response => {
        console.log(response);
        Swal.fire('Success', 'File uploaded successfully!', 'success');
      },
      error => console.error(error)
    );
  }

  uploadApprovalHRServicesAdminDocument(): void {
    const file = this.selectedFiles['approvalHRServicesAdmin'];
    if (!file) {
      alert('Please select a file first.');
      return;
    }
    this.approvalDepartementService.postApprovalHRServiceDocument(file).subscribe(
      response => {
        console.log(response);
        Swal.fire('Success', 'File uploaded successfully!', 'success');
      },
      error => console.error(error)
    );
  }

  uploadApprovalHRTalentDocument(): void {
    const file = this.selectedFiles['approvalHRTalent'];
    if (!file) {
      alert('Please select a file first.');
      return;
    }
    this.approvalDepartementService.postApprovalHRTalentDocument(file).subscribe(
      response => {
        console.log(response);
        Swal.fire('Success', 'File uploaded successfully!', 'success');
      },
      error => console.error(error)
    );
  }

  uploadApprovalSecurityAdministratorDocument(): void {
    const file = this.selectedFiles['approvalSecurityAdministrator'];
    if (!file) {
      alert('Please select a file first.');
      return;
    }
    this.approvalDepartementService.postApprovalSecurityAdminDocument(file).subscribe(
      response => {
        console.log(response);
        Swal.fire('Success', 'File uploaded successfully!', 'success');
      },
      error => console.error(error)
    );
  }

  uploadApprovalTreasuryDocument(): void {
    const file = this.selectedFiles['approvalTreasury'];
    if (!file) {
      alert('Please select a file first.');
      return;
    }
    this.approvalDepartementService.postApprovalTreasuryDocument(file).subscribe(
      response => {
        console.log(response);
        Swal.fire('Success', 'File uploaded successfully!', 'success');
      },
      error => console.error(error)
    );
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

  download() {
    this.approvalDepartementService.getApprovalTreasuryFileUrlbyKaryawan().subscribe((response: HttpResponse<Blob>) => {
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

  private getFileNameFromHttpResponse(response: HttpResponse<Blob>): string {
    const contentDisposition = response.headers.get('content-disposition');
    const matches = contentDisposition && contentDisposition.match(/filename="([^;]+)"/);
    return (matches && matches[1]) ? matches[1] : "asd";
  }
}
