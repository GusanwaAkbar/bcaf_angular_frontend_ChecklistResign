import { ApprovalAtasanGet } from "./approval-atasan"

export interface IApprovalHRPayrollGet {
nipKaryawanResign: any;
namaKaryawan: any;

    id: number;
    approvalAtasan: ApprovalAtasanGet;
    softLoan: string;
    emergencyLoan: string;
    smartphoneLoan: string;
    motorLoan: string;
    umkLoan: string;
    laptopLoan: string;
    approvalHRPayrollStatus: string;
    remarks: string;
    documentPath: string;
}

export interface IApprovalHRPayrollPost {

    id: number;
    softLoan: string;
    emergencyLoan: string;
    smartphoneLoan: string;
    motorLoan: string;
    umkLoan: string;
    laptopLoan: string;
    approvalHRPayrollStatus: string;
    remarks: string;
}