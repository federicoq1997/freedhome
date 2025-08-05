'use client';

import { useState, useEffect } from 'react';
import { Booking, BookingFormData } from '@/types/booking';
import { bookingService } from '@/services/bookingService';
import BookingTable from '@/components/BookingTable';
import BookingForm from '@/components/BookingForm';
import BookingSearch from '@/components/BookingSearch';

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadBookings = async () => {
    setIsLoading(true);
    try {
      const response = await bookingService.getBookings();
      if (response.success && response.data) {
        setBookings(response.data);
      } else {
        setMessage({ type: 'error', text: response.message || 'Errore nel caricamento' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Errore di connessione' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateBooking = async (formData: BookingFormData) => {
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await bookingService.createBooking(formData);
      if (response.success && response.data) {
        const shortCode = response.data.short_code;
        setMessage({ 
          type: 'success', 
          text: `Prenotazione creata con successo! Codice: ${shortCode}` 
        });
        await loadBookings(); // Ricarica la lista
      } else {
        setMessage({ 
          type: 'error', 
          text: response.message || 'Errore nella creazione della prenotazione' 
        });
      }
    } catch {
      setMessage({ type: 'error', text: 'Errore di connessione' });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  // Auto-hide messages after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8 px-4 max-w-6xl">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Sistema di Gestione Prenotazioni
          </h1>
          <p className="text-gray-600">
            Visualizza e crea nuove prenotazioni
          </p>
        </header>

        {/* Message Alert */}
        {message && (
          <div className={`mb-6 p-4 rounded-md ${
            message.type === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-800' 
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            <div className="flex">
              <div className="flex-shrink-0">
                {message.type === 'success' ? (
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{message.text}</p>
              </div>
              <div className="ml-auto pl-3">
                <button
                  onClick={() => setMessage(null)}
                  className="inline-flex text-gray-400 hover:text-gray-600"
                >
                  <span className="sr-only">Chiudi</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Search Section */}
        <div className="mb-8">
          <BookingSearch />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Bookings Table */}
          <div className="lg:col-span-1">
            <BookingTable bookings={bookings} isLoading={isLoading} />
          </div>

          {/* Right Column - Booking Form */}
          <div className="lg:col-span-1">
            <BookingForm onSubmit={handleCreateBooking} isLoading={isSubmitting} />
          </div>
        </div>

        {/* Refresh Button */}
        <div className="text-center mt-8">
          <button
            onClick={loadBookings}
            disabled={isLoading}
            className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 transition-colors"
          >
            {isLoading ? 'Aggiornamento...' : 'Aggiorna Lista'}
          </button>
        </div>
      </div>
    </div>
  );
}
