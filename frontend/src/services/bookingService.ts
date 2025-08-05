import { Booking, BookingFormData, ApiResponse } from '@/types/booking';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

class BookingService {
  private async fetchApi<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Errore durante la richiesta',
          errors: data.errors,
        };
      }

      return {
        success: true,
        data: data.data || data,
      };
    } catch {
      return {
        success: false,
        message: 'Errore di connessione al server',
      };
    }
  }

  async getBookings(): Promise<ApiResponse<Booking[]>> {
    return this.fetchApi<Booking[]>('/bookings');
  }

  async createBooking(booking: BookingFormData): Promise<ApiResponse<Booking>> {
    return this.fetchApi<Booking>('/bookings', {
      method: 'POST',
      body: JSON.stringify(booking),
    });
  }

  async findByShortCode(shortCode: string): Promise<ApiResponse<Booking>> {
    return this.fetchApi<Booking>(`/bookings/by-code/${shortCode}`);
  }
}

export const bookingService = new BookingService();
