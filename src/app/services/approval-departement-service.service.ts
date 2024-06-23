import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response';
import {IApprovalTreasuryGet, IApprovalTreasuryPost} from '../models/IApprovalTreasury.model'


@Injectable({
  providedIn: 'root'
})
export class ApprovalDepartementService {

  private apiUrl = environment.base_url; // Ganti dengan URL API yang sesuai

  constructor(private http: HttpClient) { }

  //Treasury Session
  //Get All (return list)
  getApprovalTreasuryList(): Observable<any> {

    return this.http.get<ApiResponse<IApprovalTreasuryGet>>(`${this.apiUrl}/api/approval-treasury`);
  }

  getApprovalTreasuryById(id: number): Observable<any> 
  {

    return this.http.get<ApiResponse<IApprovalTreasuryGet>>(`${this.apiUrl}/api/approval-treasury/${id}`)
  }

  putApprovalTreasuryById(id: number,data: IApprovalTreasuryPost): Observable<any>
  {

    return this.http.put<any>(`${this.apiUrl}/api/approval-treasury/${id}`, data)
  }

  
  //HRIR PAYROLL SESSION
  getApprovalHRPayrollList(): Observable<any> 
  {

    return this.http.get<any>(`${this.apiUrl}/api/approval-hr-payroll`)
  }


  getApprovalHRPayrollById(id: number): Observable<any> 
  {

    return this.http.get<any>(`${this.apiUrl}/api/approval-hr-payroll/${id}`)
  }

  putApprovalHRPayrollById(id: number, data: object): Observable<any> 
  {

    return this.http.put<any>(`${this.apiUrl}/api/approval-hr-payroll/${id}`, data)
  }


  //HRIR SESSION
  getApprovalHRIRList(): Observable<any> 
  {

    return this.http.get<any>(`${this.apiUrl}/api/approval-hr-ir`)
  }

  getApprovalHRIRById(id: number): Observable<any> 
  {

    return this.http.get<any>(`${this.apiUrl}/api/approval-hr-ir/${id}`)
  }

  putApprovalHRIRById(id: number, data: object): Observable<any> 
  {

    return this.http.get<any>(`${this.apiUrl}/api/approval-hr-ir/${id}`, data)
  }


  //General Service Session
  // /api/approval-general-services
  getApprovalGeneralServiceList(): Observable<any> 
  {

    return this.http.get<any>(`${this.apiUrl}/api/approval-general-services`)
  }

  getApprovalGeneralServiceById(id: number): Observable<any> 
  {

    return this.http.get<any>(`${this.apiUrl}/api/approval-general-services/${id}`)
  }

  putApprovalGeneralServiceById(id: number, data: object): Observable<any> 
  {

    return this.http.put<any>(`${this.apiUrl}/api/approval-general-services/${id}`, data)
  }


  // HR Service Session
  // {{base_url}}/api/approval-hr-services-admin/1

  getApprovalHRServiceList(): Observable<any> 
  {

    return this.http.get<any>(`${this.apiUrl}/api/approval-hr-services-admin`)
  }

  getApprovalHRServiceById(id: number): Observable<any> 
  {

    return this.http.get<any>(`${this.apiUrl}/api/approval-hr-services-admin/${id}`)
  }

  putApprovalHRServiceById(id: number, data: object): Observable<any> 
  {

    return this.http.put<any>(`${this.apiUrl}/api/approval-hr-services-admin/${id}`, data)
  }

  // Security Administrator Session
  // {{base_url}}/api/approval-security-administrator


  getApprovalSecurityAdminList(): Observable<any> 
  {

    return this.http.get<any>(`${this.apiUrl}/api/approval-security-administrator`)
  }

  getApprovalSecurityAdminById(id: number): Observable<any> 
  {

    return this.http.get<any>(`${this.apiUrl}/api/approval-security-administrator${id}`)
  }

  putApprovalSecurityAdminById(id: number, data:object): Observable<any> 
  {

    return this.http.put<any>(`${this.apiUrl}/api/approval-security-administrator${id}`, data)
  }


  //HR Talent session
  ///api/approval-hr-talent

  getApprovalHRTalentList(): Observable<any> 
  {


    return this.http.get<any>(`${this.apiUrl}/api/approval-hr-talent`)
  }

  getApprovalHRTalentById(id: number): Observable<any> 
  {


    return this.http.get<any>(`${this.apiUrl}/api/approval-hr-talent/${id}`)
  }

  putApprovalHRTalentById(id: number, data: object): Observable<any> 
  {

    return this.http.put<any>(`${this.apiUrl}/api/approval-hr-talent/${id}`, data)
  }



  //
  //

  getApprovalFinalApprovalById(id: number): Observable<any> 
  {


    return this.http.get<any>(`${this.apiUrl}/api/final-approval/${id}`)
  }


  getApprovalFinalApprovalList(): Observable<any> 
  {


    return this.http.get<any>(`${this.apiUrl}/api/final-approval`)
  }

  putApprovalFinalApprovalById(id: number, data: object): Observable<any> 
  {


    return this.http.put<any>(`${this.apiUrl}/api/final-approval/${id}`, data)
  }

  
  


  //example

  // getApprovalAtasanList(): Observable<any> {
  //   return this.http.get<ApiResponseList<ApprovalAtasanGet>>(`${this.apiUrl}/api/approval-atasan/get-approval-by-username`);
  // }

  // getApprovalAtasan(): Observable<any> {
  //   return this.http.get<ApiResponseList<ApprovalAtasanGet>>(`${this.apiUrl}/api/approval-atasan/get-approval-by-username`);
  // }

  // submitApproval(id: number, data: ApprovalAtasanPost): Observable<any> {
  //   return this.http.put<any>(`${this.apiUrl}/api/approval-atasan/get-approval-by-username/${id}`, data);
  // }


}
