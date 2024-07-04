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
  userDetail: UserDetail | null = null;

  constructor(private fb: FormBuilder, private resignationService: ResignationService) {
    this.resignationForm = this.fb.group({
      tanggalPembuatanAkunHRIS: ['', Validators.required],
      tanggalBerakhirBekerja: ['', Validators.required],
      nipAtasan: [''],
    });
  }

  ngOnInit(): void {
    this.fetchUserDetail();
  }

  fetchUserDetail(): void {
    this.resignationService.getUserDetail().subscribe(
      (response) => {
        if (response.success) {
          this.userDetail = response.data;

          if ( this.userDetail.nipAtasan) {
            this.resignationForm.patchValue({ nipAtasan: this.userDetail.nipAtasan });
          }
          
        }
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
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
      console.log('Form is valid:', this.resignationForm.value); // Add this line for debugging
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
      console.log('Form is invalid:', this.resignationForm.errors); // Add this line for debugging
    }
  }
  
}
