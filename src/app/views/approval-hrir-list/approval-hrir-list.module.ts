import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ApprovalHRIRListRoutingModule } from './approval-hrir-list-routing.module';
import { ApprovalHRIRListComponent } from './approval-hrir-list.component'
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
  ButtonGroupComponent,
  PaginationModule
} from '@coreui/angular';

import { HttpClient, HttpClientModule } from '@angular/common/http';

import { CardHeaderComponent, FormLabelDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective,  ColDirective,  } from '@coreui/angular';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [ApprovalHRIRListComponent],
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
    ApprovalHRIRListRoutingModule,
    ButtonGroupComponent,
    RouterLink,
    CardHeaderComponent,
    CardBodyComponent,
    PaginationModule
    
    
  ],
  providers: [HttpClientModule]
})
export class ApprovalHRIRListModule { }
