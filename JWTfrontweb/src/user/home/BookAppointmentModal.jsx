import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './BookAppointmentModal.css';

const BookAppointmentModal = ({
  onClose,
  setAppointmentDate,
  setAppointmentStartTime,
  setAppointmentEndTime
}) => {
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleBook = () => {
    if (!date || !startTime || !endTime) {
      alert('Please complete all fields before booking.');
      return;
    }

    // Format date to YYYY-MM-DD for consistency
    const formattedDate = date.toISOString().split('T')[0];

    // Send data back to parent
    setAppointmentDate(formattedDate);
    setAppointmentStartTime(startTime);
    setAppointmentEndTime(endTime);

    alert(`Appointment booked!\nDate: ${formattedDate}\nFrom: ${startTime} to ${endTime}`);
    onClose();
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-container">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Book an Appointment</h2>
        <div className="appointment-content">
          <div className="calendar-container">
            <Calendar onChange={setDate} value={date} />
          </div>
          <div className="schedule-container">
            <h3>Set your preferred schedule</h3>

            <div className="form-group">
              <label>Select a day</label>
              <div className="input-display">{date.toDateString()}</div>
            </div>

            <div className="form-group">
              <label>Starts at</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Ends at</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>

            <button className="book-btn" onClick={handleBook}>
               Book Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookAppointmentModal;
