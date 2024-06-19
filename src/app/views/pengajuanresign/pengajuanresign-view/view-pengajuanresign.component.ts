import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResignationService } from '../../../services/resignation.service';
import { Resignation, ResignationGet } from '../../../models/resignation.model';
import { UserDetail } from '../../../models/user-detail';

@Component({
  selector: 'app-pengajuanresign-form',
  templateUrl: './view-pengajuanresign.component.html',
  styleUrls: ['./view-pengajuanresign.component.scss']
})
export class ViewPengajuanResignComponent implements OnInit {

  resignations: any;

  constructor(private resignationService: ResignationService) { }

  ngOnInit(): void {
    this.resignationService.getResignation().subscribe(response => {
      if (response.success) {
        this.resignations = response.data;
      }
    });
  }
}

  // onSubmit(): void {
  //   if (this.resignationForm.valid) {
  //     const resignationData: Resignation = this.resignationForm.value;
  //     this.resignationService.postResignation(resignationData).subscribe(
  //       response => {
  //         console.log('Resignation submitted successfully', response);
  //       },
  //       error => {
  //         console.error('Error submitting resignation', error);
  //       }
  //     );
  //   }
  // }

