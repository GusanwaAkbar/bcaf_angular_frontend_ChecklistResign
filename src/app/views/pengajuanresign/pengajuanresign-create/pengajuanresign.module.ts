import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PengajuanResignComponent } from './pengajuanresign.component';
import { PengajuanResignRoutingModule } from './pengajuanresign-routing.module'
import { NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';


import {
  ContainerComponent,
  RowComponent,
  ColComponent,
  CardGroupComponent,
  TextColorDirective,
  CardComponent,
  CardBodyComponent,
  FormDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  FormControlDirective,
  ButtonDirective,
  DropdownModule
} from '@coreui/angular';

import { HttpClient, HttpClientModule } from '@angular/common/http';

import { CardHeaderComponent, FormLabelDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective,  ColDirective,  } from '@coreui/angular';

@NgModule({
  declarations: [PengajuanResignComponent],
  imports: [
    
    CommonModule,
    CardHeaderComponent,
    FormLabelDirective,
    FormSelectDirective,
    FormCheckComponent,
    FormCheckInputDirective,
    FormCheckLabelDirective,
    ColDirective,
    ReactiveFormsModule,
    NgStyle,
    IconDirective,
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardGroupComponent,
    TextColorDirective,
    CardComponent,
    CardBodyComponent,
    FormDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    FormControlDirective,
    ButtonDirective,
    HttpClientModule,
    PengajuanResignRoutingModule,
    DropdownModule
    
  ],
  providers: [HttpClientModule]
})
export class PengajuanResignModule { }
