'use client';

import { useState } from 'react';
import { Booking } from '@/types/booking';
import { bookingService } from '@/services/bookingService';

interface BookingSearchProps {
  onBookingFound?: (booking: Booking) => void;
}

export default function BookingSearch({ onBookingFound }: BookingSearchProps) {
  const [shortCode, setShortCode] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<Booking | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!shortCode.trim()) {
      setSearchError('Inserisci un codice prenotazione');
      return;
    }

    setIsSearching(true);
    setSearchError(null);
    setSearchResult(null);

    try {
      const response = await bookingService.findByShortCode(shortCode.trim());
      if (response.success && response.data) {
        setSearchResult(response.data);
        onBookingFound?.(response.data);
      } else {
        setSearchError(response.message || 'Prenotazione non trovata');
      }
    } catch {
      setSearchError('Errore durante la ricerca');
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setShortCode('');
    setSearchResult(null);
    setSearchError(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Cerca Prenotazione
      </h2>
      
      <form onSubmit={handleSearch} className="space-y-4">
        <div>
          <label htmlFor="shortCode" className="block text-sm font-medium text-gray-700 mb-1">
            Codice Prenotazione
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              id="shortCode"
              value={shortCode}
              onChange={(e) => setShortCode(e.target.value.toUpperCase())}
              className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono ${
                searchError ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="FH-45H7PP9"
              pattern="FH-[A-Z0-9]{7}"
              disabled={isSearching}
            />
            <button
              type="submit"
              disabled={isSearching}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSearching ? 'Cerca...' : 'Cerca'}
            </button>
            {(searchResult || searchError) && (
              <button
                type="button"
                onClick={clearSearch}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Pulisci
              </button>
            )}
          </div>
          {searchError && (
            <p className="text-red-500 text-sm mt-1">{searchError}</p>
          )}
        </div>
      </form>

      {searchResult && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            Prenotazione Trovata
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="font-medium">Codice:</span>
              <span className="font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {searchResult.short_code}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Nome:</span>
              <span>{searchResult.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Email:</span>
              <span>{searchResult.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Periodo:</span>
              <span>
                {new Date(searchResult.from).toLocaleDateString('it-IT')} - {' '}
                {new Date(searchResult.to).toLocaleDateString('it-IT')}
              </span>
            </div>
            {searchResult.created_at && (
              <div className="flex justify-between">
                <span className="font-medium">Creata il:</span>
                <span>
                  {new Date(searchResult.created_at).toLocaleDateString('it-IT')} alle{' '}
                  {new Date(searchResult.created_at).toLocaleTimeString('it-IT')}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
