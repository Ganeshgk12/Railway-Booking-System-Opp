import React, { useState } from 'react';
import { BookingForm } from './components/BookingForm';
import { AvailabilityStatus } from './components/AvailabilityStatus';
import { BookedTickets } from './components/BookedTickets';
import { NotificationModal } from './components/NotificationModal';
import { useBookingSystem } from './hooks/useBookingSystem';
import { Train } from 'lucide-react';

function App() {
  const { bookingState, bookTicket, getAvailableBerths } = useBookingSystem();
  const [notification, setNotification] = useState<{
    isOpen: boolean;
    message: string;
    type: 'success' | 'error';
  }>({
    isOpen: false,
    message: '',
    type: 'success'
  });

  const handleBooking = (name: string, age: number, gender: string, berthPreference: string) => {
    const result = bookTicket(name, age, gender, berthPreference);
    
    setNotification({
      isOpen: true,
      message: result.message,
      type: result.success ? 'success' : 'error'
    });
  };

  const closeNotification = () => {
    setNotification(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center">
            <Train className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Railway Booking System</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Booking Form */}
          <div className="flex justify-center">
            <BookingForm 
              onSubmit={handleBooking}
              availableBerths={getAvailableBerths()}
            />
          </div>

          {/* Availability Status */}
          <div className="flex justify-center">
            <AvailabilityStatus bookingState={bookingState} />
          </div>
        </div>

        {/* Booked Tickets */}
        <div className="flex justify-center">
          <BookedTickets 
            bookedTickets={bookingState.bookedTickets}
            racTickets={bookingState.racTickets}
            waitingListTickets={bookingState.waitingListTickets}
          />
        </div>
      </main>

      {/* Notification Modal */}
      <NotificationModal
        isOpen={notification.isOpen}
        onClose={closeNotification}
        message={notification.message}
        type={notification.type}
      />
    </div>
  );
}

export default App;