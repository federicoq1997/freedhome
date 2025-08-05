import { Booking } from '@/types/booking';

interface BookingTableProps {
  bookings: Booking[];
  isLoading: boolean;
}

export default function BookingTable({ bookings, isLoading }: BookingTableProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Prenotazioni
        </h2>
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Caricamento...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Prenotazioni ({bookings.length})
      </h2>
      
      {bookings.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>Nessuna prenotazione trovata</p>
          <p className="text-sm mt-1">Crea la tua prima prenotazione usando il form qui sotto</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Codice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Periodo
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
                      {booking.short_code}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {booking.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {booking.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {new Date(booking.from).toLocaleDateString('it-IT')}
                      </span>
                      <span className="text-xs text-gray-500">
                        al {new Date(booking.to).toLocaleDateString('it-IT')}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
