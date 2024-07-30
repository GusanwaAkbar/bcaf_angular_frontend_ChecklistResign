export interface UserDetail {
  id: number;
  nama: string;
  email: string | null;
  cabang: string;
  idDivisi: string;
  divisi: string;
  jabatan: string;
  externalUser: string;
  user_username: string;
  nipAtasan: string;
  userUsername:string;
}


export interface UserDetailV2 {
  karyawanResignDetail: UserDetail;
  atasanDetail: UserDetail;
}