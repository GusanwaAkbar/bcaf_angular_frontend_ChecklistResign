import { ApprovalAtasanGet } from "./approval-atasan";

export interface IApprovalGeneralServiceGet 
{
    id: number;
    approvalAtasan: ApprovalAtasanGet;
    penutupanPin: string;
    pengembalianKendaraanDinas: string;
    inventarisKantor: string;
    pengembalianAktiva: string;
    pengembalianKendaraanUMK3: string;
    approvalGeneralServicesStatus: string;
    remarks: string;
    documentPath: string;
}

export interface IApprovalGeneralServicePost
{
    penutupanPin: string;
    pengembalianKendaraanDinas: string;
    inventarisKantor: string;
    pengembalianAktiva: string;
    pengembalianKendaraanUMK3: string;
    approvalGeneralServicesStatus: string;
    remarks: string;
}