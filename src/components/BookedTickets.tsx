import React from 'react';
import { Passenger } from '../types';
import { Ticket, User, Calendar, Users } from 'lucide-react';

interface BookedTicketsProps {
  bookedTickets: Passenger[];
  racTickets: Passenger[];
  waitingListTickets: Passenger[];
}

export const BookedTickets: React.FC<BookedTicketsProps> = ({ 
  bookedTickets, 
  racTickets, 
  waitingListTickets 
}) => {
  const allTickets = [...bookedTickets, ...racTickets, ...waitingListTickets];

  if (allTickets.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl w-full">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <Ticket className="w-5 h-5 mr-2" />
          Booked Tickets
        </h3>
        <p className="text-gray-500 text-center py-8">No tickets booked yet</p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'rac':
        return 'bg-yellow-100 text-yellow-800';
      case 'waiting':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmed';
      case 'rac':
        return 'RAC';
      case 'waiting':
        return 'Waiting List';
      default:
        return status;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl w-full">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <Ticket className="w-5 h-5 mr-2" />
        Booked Tickets ({allTickets.length})
      </h3>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {allTickets.map((ticket) => (
          <div key={ticket.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center">
                <User className="w-4 h-4 text-gray-500 mr-2" />
                <span className="font-semibold text-gray-800">{ticket.name}</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(ticket.status)}`}>
                {getStatusText(ticket.status)}
              </span>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                Age: {ticket.age}
              </div>
              <div className="flex items-center">
                <Users className="w-3 h-3 mr-1" />
                {ticket.gender}
              </div>
              <div className="flex items-center">
                <Ticket className="w-3 h-3 mr-1" />
                {ticket.berthPreference.charAt(0).toUpperCase() + ticket.berthPreference.slice(1)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};