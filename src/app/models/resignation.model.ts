import { UserDetail } from "./user-detail";

// src/app/models/resignation.model.ts
export interface Resignation {
    isiUntukOrangLain: boolean;
    tanggalPembuatanAkunHRIS: string;
    tanggalBerakhirBekerja: string;
    emailAtasan: string;
    nipAtasan: string;
  }
  


  export interface ResignationGet {
approvalAtasan: any;
createdDate: any;
approvedDate: any;
pengajuanResign: any;
nipKaryawanResign: any;
namaKaryawan: any;
    id: number;
    isiUntukOrangLain: boolean;
    tanggalPembuatanAkunHRIS: string;
    tanggalBerakhirBekerja: string;
    userDetailResign: UserDetail;
    nipAtasan: string;
    emailAtasan: string;
  }

  