import React, { useState } from 'react';
import carsData from '../data/carsData';

function TestDriveBooking() {
  const [name, setName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');
  const [modelNo, setModelNo] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookingData = { name, phone_no: phoneNo, email, model_no: modelNo, booking_date: bookingDate };

    try {
      const response = await fetch('http://localhost:5000/api/book-test-drive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });
      const data = await response.json();
      setMessage(data.message);
      // Reset form
      setName('');
      setPhoneNo('');
      setEmail('');
      setModelNo('');
      setBookingDate('');
    } catch (error) {
      setMessage('Error booking test drive');
    }
  };

  return (
    <div className="test-drive-booking">
      <h2>Book a Test Drive</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Phone No:</label>
          <input type="tel" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Model:</label>
          <select value={modelNo} onChange={(e) => setModelNo(e.target.value)} required>
            <option value="">Select a model</option>
            {carsData.map((car) => (
              <option key={car.id} value={car.model}>
                {car.brand} {car.model}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Booking Date:</label>
          <input type="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} required />
        </div>
        <button type="submit">Book Now</button>
      </form>
    </div>
  );
}

export default TestDriveBooking;