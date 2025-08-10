import { useState } from 'react';
import { Passenger, BookingState } from '../types';

export const useBookingSystem = () => {
  const [bookingState, setBookingState] = useState<BookingState>({
    totalBerths: 3,
    lowerBerths: 1,
    middleBerths: 1,
    upperBerths: 1,
    totalRACBerths: 1,
    totalWaitingListTickets: 1,
    bookedTickets: [],
    racTickets: [],
    waitingListTickets: []
  });

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const bookTicket = (name: string, age: number, gender: string, berthPreference: string): { success: boolean; message: string; passenger?: Passenger } => {
    if (age <= 5) {
      return { success: false, message: 'Children 5 years and below do not need separate tickets' };
    }

    const passenger: Passenger = {
      id: generateId(),
      name,
      age,
      gender,
      berthPreference,
      status: 'confirmed'
    };

    setBookingState(prev => {
      const newState = { ...prev };
      
      // Check if preferred berth is available
      if (berthPreference === 'lower' && prev.lowerBerths > 0) {
        newState.lowerBerths--;
        newState.totalBerths--;
        newState.bookedTickets = [...prev.bookedTickets, passenger];
        return newState;
      } else if (berthPreference === 'middle' && prev.middleBerths > 0) {
        newState.middleBerths--;
        newState.totalBerths--;
        newState.bookedTickets = [...prev.bookedTickets, passenger];
        return newState;
      } else if (berthPreference === 'upper' && prev.upperBerths > 0) {
        newState.upperBerths--;
        newState.totalBerths--;
        newState.bookedTickets = [...prev.bookedTickets, passenger];
        return newState;
      }
      
      // If preferred berth not available, check other berths
      if (prev.totalBerths > 0) {
        if (prev.lowerBerths > 0) {
          newState.lowerBerths--;
          newState.totalBerths--;
          passenger.berthPreference = 'lower';
          newState.bookedTickets = [...prev.bookedTickets, passenger];
          return newState;
        } else if (prev.middleBerths > 0) {
          newState.middleBerths--;
          newState.totalBerths--;
          passenger.berthPreference = 'middle';
          newState.bookedTickets = [...prev.bookedTickets, passenger];
          return newState;
        } else if (prev.upperBerths > 0) {
          newState.upperBerths--;
          newState.totalBerths--;
          passenger.berthPreference = 'upper';
          newState.bookedTickets = [...prev.bookedTickets, passenger];
          return newState;
        }
      }
      
      // If no berths available, try RAC
      if (prev.totalRACBerths > 0) {
        newState.totalRACBerths--;
        passenger.status = 'rac';
        passenger.berthPreference = 'side lower';
        newState.racTickets = [...prev.racTickets, passenger];
        return newState;
      }
      
      // If no RAC available, add to waiting list
      if (prev.totalWaitingListTickets > 0) {
        newState.totalWaitingListTickets--;
        passenger.status = 'waiting';
        passenger.berthPreference = 'waiting';
        newState.waitingListTickets = [...prev.waitingListTickets, passenger];
        return newState;
      }
      
      return prev;
    });

    // Determine the result message
    if (bookingState.totalBerths > 0 || 
        (berthPreference === 'lower' && bookingState.lowerBerths > 0) ||
        (berthPreference === 'middle' && bookingState.middleBerths > 0) ||
        (berthPreference === 'upper' && bookingState.upperBerths > 0)) {
      return { success: true, message: 'Ticket booked successfully!', passenger };
    } else if (bookingState.totalRACBerths > 0) {
      return { success: true, message: 'RAC ticket booked successfully!', passenger };
    } else if (bookingState.totalWaitingListTickets > 0) {
      return { success: true, message: 'Waiting list ticket booked successfully!', passenger };
    } else {
      return { success: false, message: 'No tickets available!' };
    }
  };

  const getAvailableBerths = () => {
    const available = [];
    if (bookingState.lowerBerths > 0) available.push('lower');
    if (bookingState.middleBerths > 0) available.push('middle');
    if (bookingState.upperBerths > 0) available.push('upper');
    return available;
  };

  return {
    bookingState,
    bookTicket,
    getAvailableBerths
  };
};