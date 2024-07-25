import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PengajuanResignDetailComponent } from './pengajuanresign-detail.component';
import { PengajuanResignDetailRoutingModule } from './pengajuanresign-detail-routing.module'
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
  TableModule,
  ButtonModule,
  ButtonGroupModule
} from '@coreui/angular';

import { HttpClient, HttpClientModule } from '@angular/common/http';

import { CardHeaderComponent, FormLabelDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective,  ColDirective,  } from '@coreui/angular';
import { ButtonGroupsComponent } from '../../buttons/button-groups/button-groups.component';

@NgModule({
  declarations: [PengajuanResignDetailComponent],
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
    PengajuanResignDetailRoutingModule,
    TableModule,
    ButtonGroupsComponent,
    ButtonDirective,
    ButtonGroupModule

    
  ],
  providers: [HttpClientModule]
})
export class PengajuanResignDetailModule { }
