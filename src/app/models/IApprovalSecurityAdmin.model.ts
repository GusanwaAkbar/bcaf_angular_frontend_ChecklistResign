import { ApprovalAtasanGet } from "./approval-atasan";

export interface IApprovalSecurityAdminGet
{

    id: number;
    approvalAtasan: ApprovalAtasanGet;
    permohonanPenutupanUser: string;
    penutupanEmailBCA: string;
    pengembalianToken: string;
    approvalSecurityAdministratorStatus: string;
    remarks: string

}


export interface IApprovalSecurityAdminPost
{

    permohonanPenutupanUser: string;
    penutupanEmailBCA: string;
    pengembalianToken: string;
    approvalSecurityAdministratorStatus: string;
    remarks: string

}