import { ApprovalAtasanGet } from "./approval-atasan";

export interface IApprovalHRTalentGet
{
namaKaryawan: any;
nipKaryawanResign: any;

    id: number;
    pengecekanBiaya: string;
    approvalHRTalentStatus: string;
    remarks: string;
    approvalAtasan: ApprovalAtasanGet;
    documentPath: string;
}

export interface IApprovalHRTalentPost
{

    
    pengecekanBiaya: string;
    approvalHRTalentStatus: string;
    remarks: string;
    
}