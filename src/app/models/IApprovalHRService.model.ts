import { ApprovalAtasanGet } from "./approval-atasan";
import { ResignationGet } from "./resignation.model";
import { UserDetail } from "./user-detail";

export interface IApprovalHRServiceGet
{
namaKaryawan: any;
nipKaryawanResign: any;

    id: number;
    approvalAtasan: ApprovalAtasanGet;
    excessOfClaim: string;
    penyelesaianBiayaHR: string;
    penonaktifanKartuElektronik: string;
    approvalHRServicesAdminStatus: string;
    remarks: string;
    documentPath: string;
}


export interface IApprovalHRServicePost
{
    excessOfClaim: string;
    penyelesaianBiayaHR: string;
    penonaktifanKartuElektronik: string;
    approvalHRServicesAdminStatus: string;
    remarks: string;
}