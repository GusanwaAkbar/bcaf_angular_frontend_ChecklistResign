import { ApprovalAtasanGet } from "./approval-atasan";

export interface IApprovalHRIRGet 
{
nipKaryawanResign: any;
namaKaryawan: any;
    id: number;
    approvalAtasan: ApprovalAtasanGet;
    exitInterview: string;
    approvalHRIRStatus: string;
    remarks: string;
    documentPath: string;
}

export interface IApprovalHRIRPost
{
    id: number;
    exitInterview: string;
    approvalHRIRStatus: string;
    remarks: string;
}