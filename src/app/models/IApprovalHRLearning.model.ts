import { ApprovalAtasanGet} from "./approval-atasan"

export interface IApprovalHRLearningGet {
    id:number;
    approvalAtasan: ApprovalAtasanGet;
    pengecekanBiayaTraining: string;
    approvalHRLearningStatus: string;
    remarks: string;
}

export interface IApprovalHRLearningPost {

    pengecekanBiayaTraining: string;
    approvalHRLearningStatus: string;
    remarks: string;
}