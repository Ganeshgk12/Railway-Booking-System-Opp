export interface Passenger {
  id: string;
  name: string;
  age: number;
  gender: string;
  berthPreference: string;
  status: 'confirmed' | 'rac' | 'waiting';
}

export interface BookingState {
  totalBerths: number;
  lowerBerths: number;
  middleBerths: number;
  upperBerths: number;
  totalRACBerths: number;
  totalWaitingListTickets: number;
  bookedTickets: Passenger[];
  racTickets: Passenger[];
  waitingListTickets: Passenger[];
}