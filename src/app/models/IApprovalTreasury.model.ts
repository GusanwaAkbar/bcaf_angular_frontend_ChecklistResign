import { Resignation, ResignationGet } from "./resignation.model";
import { ApprovalAtasanGet } from "./approval-atasan";

export interface IApprovalTreasuryGet {
nipKaryawanResign: any;
namaKaryawan: any;


    id: string;
    approvalAtasan: ApprovalAtasanGet
    biayaAdvance: string;
    blokirFleet: string;
    approvalTreasuryStatus: string;
    remarks: string;
    documentPath: string;
}

export interface IApprovalTreasuryPost {
    blokirFleet: string;
    approvalTreasuryStatus: string;
    remarks: string;
}

