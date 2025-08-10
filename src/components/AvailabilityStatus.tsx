import React from 'react';
import { BookingState } from '../types';
import { Bed, Clock, AlertCircle } from 'lucide-react';

interface AvailabilityStatusProps {
  bookingState: BookingState;
}

export const AvailabilityStatus: React.FC<AvailabilityStatusProps> = ({ bookingState }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <Bed className="w-5 h-5 mr-2" />
        Seat Availability
      </h3>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
          <span className="font-medium text-gray-700">Lower Berths</span>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
            bookingState.lowerBerths > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {bookingState.lowerBerths} Available
          </span>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
          <span className="font-medium text-gray-700">Middle Berths</span>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
            bookingState.middleBerths > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {bookingState.middleBerths} Available
          </span>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
          <span className="font-medium text-gray-700">Upper Berths</span>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
            bookingState.upperBerths > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {bookingState.upperBerths} Available
          </span>
        </div>
        
        <div className="border-t pt-4">
          <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg mb-2">
            <span className="font-medium text-gray-700 flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              RAC Tickets
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              bookingState.totalRACBerths > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
            }`}>
              {bookingState.totalRACBerths} Available
            </span>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
            <span className="font-medium text-gray-700 flex items-center">
              <AlertCircle className="w-4 h-4 mr-2" />
              Waiting List
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              bookingState.totalWaitingListTickets > 0 ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'
            }`}>
              {bookingState.totalWaitingListTickets} Available
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};