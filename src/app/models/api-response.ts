export interface ApiResponse<T> {
    
    data: T;
    success: boolean;
    message: string;
    status: number;
    timestamp: string;
    errorDetails: any;

  }


  export interface ApiResponseList<T> {
    
    data: T[];
    success: boolean;
    message: string;
    status: number;
    timestamp: string;
    errorDetails: any;

  }