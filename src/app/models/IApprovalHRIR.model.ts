import { ApprovalAtasanGet } from "./approval-atasan";

export interface IApprovalHRIRGet 
{
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