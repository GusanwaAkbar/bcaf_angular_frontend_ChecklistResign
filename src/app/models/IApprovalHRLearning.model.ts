import { ApprovalAtasanGet} from "./approval-atasan"

export interface IApprovalHRLearningGet {
nipKaryawanResign: any;
namaKaryawan: any;
    id:number;
    approvalAtasan: ApprovalAtasanGet;
    pengecekanBiayaTraining: string;
    approvalHRLearningStatus: string;
    remarks: string;
    documentPath: string;
}

export interface IApprovalHRLearningPost {

    pengecekanBiayaTraining: string;
    approvalHRLearningStatus: string;
    remarks: string;
}