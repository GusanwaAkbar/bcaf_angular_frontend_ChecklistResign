import { ApprovalAtasanGet } from "./approval-atasan";

export interface IApprovalHRTalentGet
{

    id: number;
    pengecekanBiaya: string;
    approvalHRTalentStatus: string;
    remarks: string;
    approvalAtasan: ApprovalAtasanGet;
}

export interface IApprovalHRTalentPost
{

    
    pengecekanBiaya: string;
    approvalHRTalentStatus: string;
    remarks: string;
    
}