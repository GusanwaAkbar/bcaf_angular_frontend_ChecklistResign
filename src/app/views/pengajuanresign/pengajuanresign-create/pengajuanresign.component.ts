import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResignationService } from '../../../services/resignation.service';
import { Resignation } from '../../../models/resignation.model';
import { UserDetail } from 'src/app/models/user-detail';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pengajuanresign-form',
  templateUrl: './pengajuanresign.component.html',
  styleUrls: ['./pengajuanresign.component.scss']
})
export class PengajuanResignComponent implements OnInit {
  resignationForm: FormGroup;
  karyawanDetail: UserDetail | null = null;
  allAtasanDetails: UserDetail[] = [];
  atasanDetail: UserDetail | null = null;

  constructor(private fb: FormBuilder, private resignationService: ResignationService) {
    this.resignationForm = this.fb.group({
      tanggalPembuatanAkunHRIS: ['', Validators.required],
      tanggalBerakhirBekerja: ['', Validators.required],
      nipAtasan: [''],
      atasan: ['', Validators.required],
      atasanName: ['']
      
    });
  }

  ngOnInit(): void {
    this.fetchUserDetails();
  }

  fetchUserDetails(): void {
    this.resignationService.getUserDetailV2().subscribe(
      response => {
        if (response.success && response.data) {
          this.karyawanDetail = response.data.karyawanResignDetail;
          this.allAtasanDetails.push(response.data.atasanDetail);
          this.resignationForm.patchValue({
            nipAtasan: this.allAtasanDetails[0]?.user_username || '',
            atasan: this.allAtasanDetails[0]?.user_username || '',
            atasanName: this.allAtasanDetails[0]?.nama || ''
          });
          this.updateAtasanDetail(this.allAtasanDetails[0]?.user_username);
        } else {
          Swal.fire('Error!', 'Failed to fetch user details.', 'error');
        }
      },
      error => {
        Swal.fire('Error!', 'Failed to fetch user details.', 'error');
      }
    );

    this.resignationService.getUserDetailAtasan2().subscribe(
      response => {
        if (response.success && response.data) {
          this.allAtasanDetails.push(response.data.atasanDetail);
        } else {
          Swal.fire('Error!', 'Failed to fetch user details.', 'error');
        }
      },
      error => {
        Swal.fire('Error!', 'Failed to fetch user details.', 'error');
      }
    );
  }

  selectAtasan(atasan: UserDetail): void {
    this.resignationForm.patchValue({
      atasan: atasan.user_username,
      atasanName: atasan.nama,
      nipAtasan: atasan.user_username
    });
    this.updateAtasanDetail(atasan.user_username);
  }

  updateAtasanDetail(selectedAtasanUsername: string): void {
    const selectedAtasanDetail = this.allAtasanDetails.find(atasan => atasan.user_username === selectedAtasanUsername);
    if (selectedAtasanDetail) {
      this.atasanDetail = selectedAtasanDetail;
      this.resignationForm.patchValue({
        nipAtasan: selectedAtasanDetail.user_username
      });
    }
  }

  confirmSubmit(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to submit the resignation form?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, submit it!',
      cancelButtonText: 'No, cancel!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.onSubmit();
      }
    });
  }

  onSubmit(): void {
    if (this.resignationForm.valid) {
      const resignationData: Resignation = this.resignationForm.value;
      this.resignationService.postResignation(resignationData).subscribe(
        response => {
          Swal.fire('Submitted!', 'Pengajuan Resign telah disetujui.', 'success');
        },
        error => {
          Swal.fire('Error!', 'Pastikan semua form terisi selesai/tidak ada jika accept, atau pilih pending', 'error');
        }
      );
    } else {
      console.log('Form is invalid:', this.resignationForm.errors);
    }
  }
}
