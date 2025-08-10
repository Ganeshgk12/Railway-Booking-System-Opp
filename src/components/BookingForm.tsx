import React, { useState } from 'react';
import { Train, User, Calendar, Users } from 'lucide-react';

interface BookingFormProps {
  onSubmit: (name: string, age: number, gender: string, berthPreference: string) => void;
  availableBerths: string[];
}

export const BookingForm: React.FC<BookingFormProps> = ({ onSubmit, availableBerths }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    berthPreference: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.age || !formData.gender || !formData.berthPreference) {
      alert('Please fill all fields');
      return;
    }
    onSubmit(formData.name, parseInt(formData.age), formData.gender, formData.berthPreference);
    setFormData({ name: '', age: '', gender: '', berthPreference: '' });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
      <div className="flex items-center justify-center mb-6">
        <Train className="w-8 h-8 text-blue-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-800">Book Your Ticket</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <User className="w-4 h-4 mr-2" />
            Passenger Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter full name"
          />
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Calendar className="w-4 h-4 mr-2" />
            Age
          </label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter age"
            min="1"
            max="120"
          />
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Users className="w-4 h-4 mr-2" />
            Gender
          </label>
          <select
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Train className="w-4 h-4 mr-2" />
            Berth Preference
          </label>
          <select
            value={formData.berthPreference}
            onChange={(e) => setFormData({ ...formData, berthPreference: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">Select Berth Preference</option>
            <option value="lower">Lower Berth</option>
            <option value="middle">Middle Berth</option>
            <option value="upper">Upper Berth</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
        >
          Book Ticket
        </button>
      </form>
    </div>
  );
};