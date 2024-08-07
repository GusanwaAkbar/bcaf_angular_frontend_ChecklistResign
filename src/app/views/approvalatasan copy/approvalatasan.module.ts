import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ApprovalAtasanComponent } from './approvalatasan.component';
import { ApprovalAtasanRoutingModule } from './approvalatasan-routing.module';
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
  ButtonGroupComponent
} from '@coreui/angular';

import { HttpClient, HttpClientModule } from '@angular/common/http';

import { CardHeaderComponent, FormLabelDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective,  ColDirective,  } from '@coreui/angular';

import { BlockUIModule } from 'ng-block-ui';

@NgModule({
  declarations: [ApprovalAtasanComponent],
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
    ApprovalAtasanRoutingModule,
    ButtonGroupComponent,
    BlockUIModule.forRoot(),
  
    
    
  ],
  providers: [HttpClientModule]
})
export class ApprovalAtasanModule { }
