export interface ApiResponse<T> {
    
    data: T;
    success: boolean;
    message: string;
    status: number;
    timestamp: string;
    errorDetails: any;

  }