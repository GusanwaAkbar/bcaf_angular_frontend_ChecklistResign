import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { ApprovalFinalApprovalDetailComponent } from './approval-finalapproval-detail.component';
import { ApprovalFinalApprovalDetailRoutingModule } from './approval-finalapproval-detail-routing.module'
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
  ButtonModule,
  ButtonToolbarComponent,
  TableModule,
  TableActiveDirective,
  ButtonGroupModule,
} from '@coreui/angular';

import { HttpClient, HttpClientModule } from '@angular/common/http';

import { CardHeaderComponent, FormLabelDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective,  ColDirective,  } from '@coreui/angular';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [ApprovalFinalApprovalDetailComponent],
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
    ApprovalFinalApprovalDetailRoutingModule,
    ButtonGroupComponent,
    RouterLink,
    CardHeaderComponent,
    CardBodyComponent,
    ButtonDirective,
    ButtonGroupComponent,
    ButtonModule,
    ButtonToolbarComponent,
    TableModule,
    TableActiveDirective,
    ButtonModule,
    ButtonGroupModule,
    
    
    
  ],
  providers: [HttpClientModule]
})
export class ApprovalFinalApprovalDetailModule { }
