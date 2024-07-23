import { ApprovalAtasanGet } from "./approval-atasan";

export interface IApprovalSecurityAdminGet
{
[x: string]: any;
nipKaryawanResign: any;

    id: number;
    namaKaryawan: string;
    approvalAtasan: ApprovalAtasanGet;
    permohonanPenutupanUser: string;
    penutupanEmailBCA: string;
    pengembalianToken: string;
    approvalSecurityAdministratorStatus: string;
    remarks: string
    documentPath: string;

}


export interface IApprovalSecurityAdminPost
{

    permohonanPenutupanUser: string;
    penutupanEmailBCA: string;
    pengembalianToken: string;
    approvalSecurityAdministratorStatus: string;
    remarks: string

}