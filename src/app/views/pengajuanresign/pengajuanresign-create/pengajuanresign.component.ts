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
      emailAtasan: ['', [Validators.required, Validators.email]],
      nipAtasan: ['', Validators.required],
      emailAktif: ['', [Validators.required, Validators.email]],
      nomerWA: ['', Validators.required]
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
      const resignationData: Resignation = this.resignationForm.value;
      this.resignationService.postResignation(resignationData).subscribe(
        response => {
          Swal.fire('Submitted!', 'Your resignation form has been submitted.', 'success');
        },
        error => {
          Swal.fire('Error!', 'There was an error submitting your resignation form.', 'error');
        }
      );
    }
  }
}
