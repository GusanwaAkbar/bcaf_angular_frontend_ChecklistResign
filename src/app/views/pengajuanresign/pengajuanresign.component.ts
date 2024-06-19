import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResignationService } from '../../services/resignation.service';
import { Resignation } from '../../models/resignation.model';
import { UserDetail } from 'src/app/models/user-detail';

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
      isiUntukOrangLain: [false, Validators.required],
      tanggalPembuatanAkunHRIS: ['', Validators.required],
      tanggalBerakhirBekerja: ['', Validators.required],
      emailAtasan: ['', [Validators.required, Validators.email]],
      nipAtasan: ['', Validators.required]
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

  onSubmit(): void {
    if (this.resignationForm.valid) {
      const resignationData: Resignation = this.resignationForm.value;
      this.resignationService.postResignation(resignationData).subscribe(
        response => {
          console.log('Resignation submitted successfully', response);
        },
        error => {
          console.error('Error submitting resignation', error);
        }
      );
    }
  }
}
