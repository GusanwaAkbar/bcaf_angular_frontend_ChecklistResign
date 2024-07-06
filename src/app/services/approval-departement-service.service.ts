import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
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

  getApprovalTreasuryByKaryawan(): Observable<any>
  {

    return this.http.get<any>(`${this.apiUrl}/api/approval-treasury/karyawan-resign)`);
  }

  putApprovalTreasuryById(id: number,data: IApprovalTreasuryPost): Observable<any>
  {

    return this.http.put<any>(`${this.apiUrl}/api/approval-treasury/${id}`, data)
  }

  getApprovalTreasuryFileUrlbyKaryawan(): Observable<HttpResponse<Blob>> {


    return this.http.get(`${this.apiUrl}/api/approval-treasury/download`, {  responseType: 'blob', observe: 'response' });
  }

  getApprovalTreasuryFileUrlbyId(id: number): Observable<HttpResponse<Blob>> {


    return this.http.get(`${this.apiUrl}/api/approval-treasury/download/${id}`, {  responseType: 'blob', observe: 'response' });
  }


  // buat service post document ke service departement lain
  postApprovalTreasuryDocument(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<any>(`${this.apiUrl}/api/approval-treasury/upload`, formData);
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


  getApprovalHRPayrollByKaryawan(): Observable<any>
  {

    return this.http.get<any>(`${this.apiUrl}/api/approval-hr-payroll/karyawan-resign)`);
  }

  putApprovalHRPayrollById(id: number, data: object): Observable<any> 
  {

    return this.http.put<any>(`${this.apiUrl}/api/approval-hr-payroll/${id}`, data)
  }

  postApprovalHRPayrollDocument(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<any>(`${this.apiUrl}/api/approval-hr-payroll/upload`, formData);
  }

  getApprovalHRPayrollFileUrlbyKaryawan(): Observable<HttpResponse<Blob>> {


    return this.http.get(`${this.apiUrl}/api/approval-hr-payroll/download`, {  responseType: 'blob', observe: 'response' });
  }

  getApprovalHRPayrollFileUrlbyId(id: number): Observable<HttpResponse<Blob>> {


    return this.http.get(`${this.apiUrl}/api/approval-hr-payroll/download/${id}`, {  responseType: 'blob', observe: 'response' });
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

    return this.http.put<any>(`${this.apiUrl}/api/approval-hr-ir/${id}`, data)
  }


  getApprovalHRIRByKaryawan(): Observable<any>
  {

    return this.http.get<any>(`${this.apiUrl}/api/approval-hr-ir/karyawan-resign)`);
  }

  postApprovalHRIRDocument(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<any>(`${this.apiUrl}/api/approval-hr-ir/upload`, formData);
  }

  getApprovalHRIRFileUrlbyKaryawan(): Observable<HttpResponse<Blob>> {


    return this.http.get(`${this.apiUrl}/api/approval-hr-ir/download`, {  responseType: 'blob', observe: 'response' });
  }

  getApprovalHRIRFileUrlbyId(id: number): Observable<HttpResponse<Blob>> {


    return this.http.get(`${this.apiUrl}/api/approval-hr-ir/download/${id}`, {  responseType: 'blob', observe: 'response' });
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

  getApprovalGeneralServiceByKaryawan(): Observable<any>
  {

    return this.http.get<any>(`${this.apiUrl}/api/approval-general-services/karyawan-resign)`);
  }

  postApprovalGeneralServiceDocument(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<any>(`${this.apiUrl}/api/approval-general-services/upload`, formData);
  }

  getApprovalGeneralServiceFileUrlbyKaryawan(): Observable<HttpResponse<Blob>> {


    return this.http.get(`${this.apiUrl}/api/approval-general-services/download`, {  responseType: 'blob', observe: 'response' });
  }

  getApprovalGeneralServiceFileUrlbyId(id: number): Observable<HttpResponse<Blob>> {


    return this.http.get(`${this.apiUrl}/api/approval-general-services/download/${id}`, {  responseType: 'blob', observe: 'response' });
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

  getApprovalHRServiceByKaryawan(): Observable<any>
  {

    return this.http.get<any>(`${this.apiUrl}/api/approval-hr-services-admin/karyawan-resign)`);
  }

  putApprovalHRServiceById(id: number, data: object): Observable<any> 
  {

    return this.http.put<any>(`${this.apiUrl}/api/approval-hr-services-admin/${id}`, data)
  }

  postApprovalHRServiceDocument(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<any>(`${this.apiUrl}/api/approval-hr-services/upload`, formData);
  }

  getApprovalHRServiceFileUrlbyKaryawan(): Observable<HttpResponse<Blob>> {


    return this.http.get(`${this.apiUrl}/api/approval-hr-service/download`, {  responseType: 'blob', observe: 'response' });
  }

  getApprovalHRServiceFileUrlbyId(id: number): Observable<HttpResponse<Blob>> {


    return this.http.get(`${this.apiUrl}/api/approval-hr-service/download/${id}`, {  responseType: 'blob', observe: 'response' });
  }

  // Security Administrator Session
  // {{base_url}}/api/approval-security-administrator


  getApprovalSecurityAdminList(): Observable<any> 
  {

    return this.http.get<any>(`${this.apiUrl}/api/approval-security-administrator`)
  }

  getApprovalSecurityAdminById(id: number): Observable<any> 
  {

    return this.http.get<any>(`${this.apiUrl}/api/approval-security-administrator/${id}`)
  }

  getApprovalSecurityAdminByKaryawan(): Observable<any>
  {

    return this.http.get<any>(`${this.apiUrl}/api/approval-security-administrator/karyawan-resign)`);
  }

  putApprovalSecurityAdminById(id: number, data:object): Observable<any> 
  {

    return this.http.put<any>(`${this.apiUrl}/api/approval-security-administrator/${id}`, data)
  }

  postApprovalSecurityAdminDocument(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<any>(`${this.apiUrl}/api/approval-security-administrator/upload`, formData);
  }

  getApprovalSecurityAdminFileUrlbyKaryawan(): Observable<HttpResponse<Blob>> {


    return this.http.get(`${this.apiUrl}/api/approval-security-administrator/download`, {  responseType: 'blob', observe: 'response' });
  }

  getApprovalSecurityAdminFileUrlbyId(id: number): Observable<HttpResponse<Blob>> {


    return this.http.get(`${this.apiUrl}/api/approval-security-administrator/download/${id}`, {  responseType: 'blob', observe: 'response' });
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

  getApprovalHRTalentByKaryawan(): Observable<any>
  {

    return this.http.get<any>(`${this.apiUrl}/api/approval-hr-talent/karyawan-resign)`);
  }

  putApprovalHRTalentById(id: number, data: object): Observable<any> 
  {

    return this.http.put<any>(`${this.apiUrl}/api/approval-hr-talent/${id}`, data)
  }

  postApprovalHRTalentDocument(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<any>(`${this.apiUrl}/api/approval-hr-talent/upload`, formData);
  }

  getApprovalHRTalentFileUrlbyKaryawan(): Observable<HttpResponse<Blob>> {


    return this.http.get(`${this.apiUrl}/api/approval-hr-talent/download`, {  responseType: 'blob', observe: 'response' });
  }

  getApprovalHRTalentFileUrlbyId(id: number): Observable<HttpResponse<Blob>> {


    return this.http.get(`${this.apiUrl}/api/approval-hr-talent/download/${id}`, {  responseType: 'blob', observe: 'response' });
  }


  //HR Learning
  getApprovalHRLearningList(): Observable<any>
  {


    return this.http.get<any>(`${this.apiUrl}/api/approval-hr-learning`)
  }

  getApprovalHRLearningById(id: number): Observable<any>
  {


    return this.http.get<any>(`${this.apiUrl}/api/approval-hr-learning/${id}`)
  }

  getApprovalHRLearningByKaryawan(): Observable<any>
  {

    return this.http.get<any>(`${this.apiUrl}/api/approval-hr-learning/karyawan-resign)`);
  }

  putApprovalHRLearningById(id: number, data: object): Observable<any>
  {


    return this.http.put<any>(`${this.apiUrl}/api/approval-hr-learning/${id}`,data)
  }

  postApprovalHRLearningDocument(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<any>(`${this.apiUrl}/api/approval-hr-learning/upload`, formData);
  }

  getApprovalHRLearningFileUrlbyKaryawan(): Observable<HttpResponse<Blob>> {


    return this.http.get(`${this.apiUrl}/api/approval-hr-learning/download`, {  responseType: 'blob', observe: 'response' });
  }

  getApprovalHRLearningFileUrlbyId(id: number): Observable<HttpResponse<Blob>> {


    return this.http.get(`${this.apiUrl}/api/approval-hr-learning/download/${id}`, {  responseType: 'blob', observe: 'response' });
  }





  //Final approval Session
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
