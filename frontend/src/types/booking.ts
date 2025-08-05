export interface Booking {
  id?: number;
  code?: string;           // UUID for internal use
  short_code?: string;     // Short code for user display (FH-XXXXXXX)
  name: string;
  email: string;
  from: string;
  to: string;
  created_at?: string;
  updated_at?: string;
}

export interface BookingFormData {
  name: string;
  email: string;
  from: string;
  to: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}
