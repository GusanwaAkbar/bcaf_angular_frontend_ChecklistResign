
export interface LoginResponse {
    
    token: string;
    id: any;
    username: string;
    authorities: { authority: string }[];
    userDetail: any;


  }