// src/app/models/approval.model.ts

import { Resignation, ResignationGet } from "./resignation.model";
import { UserDetail } from "./user-detail";

export interface ApprovalAtasanPost {
    serahTerimaTugas: string;
    pengembalianNotebook: string;
    pengembalianKunciLoker: string;
    pengembalianKunciRuangan: string;
    penyerahanSuratPengunduranDiri: string;
    pengembalianIdCard: string;
    hapusAplikasiMobile: string;
    uninstallSoftwareNotebook: string;
    uninstallSoftwareUnitKerja: string;
    approvalStatusAtasan: string;
    remarksAtasan: string;
    documentPath: string;
  }


  export interface ApprovalAtasanGet {
namaKaryawan: any;
nipKaryawanResign: any;
    id: number;
    nipAtasan: string;
    emailAtasan: string;
    userDetailAtasan: UserDetail;
    pengajuanResign: ResignationGet;
    serahTerimaTugas: string;
    pengembalianNotebook: string;
    pengembalianKunciLoker: string;
    pengembalianKunciRuangan: string;
    penyerahanSuratPengunduranDiri: string;
    pengembalianIdCard: string;
    hapusAplikasiMobile: string;
    uninstallSoftwareNotebook: string;
    uninstallSoftwareUnitKerja: string;
    approvalStatusAtasan: string;
    remarksAtasan: string;
  }


  