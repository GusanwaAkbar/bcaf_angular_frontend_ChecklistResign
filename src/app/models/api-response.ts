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

  export interface ApiResponsePage<T> {
    data: {
      content: T[];
      totalPages: number;
      totalElements: number;
      size: number;
      number: number;
    };
    success: boolean;
    message: string;
    statusCode: number;
  }