import React, { useState } from 'react';
import './seatscomponet.css'; // Import this for custom styles

// Sample seat data for demonstration
const seatRows = [
  { type: 'Classic', price: 210, rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G'], seatsPerRow: 12 },
  { type: 'Prime', price: 230, rows: ['H', 'J', 'K'], seatsPerRow: 12 },
  { type: 'Recliner', price: 420, rows: ['L'], seatsPerRow: 8 },
];

const SeatMap = ({ onSeatSelectionChange }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (row, seatNumber) => {
    const seatId = `${row}${seatNumber}`;
    let updatedSeats;

    if (selectedSeats.includes(seatId)) {
      updatedSeats = selectedSeats.filter(seat => seat !== seatId);
    } else {
      updatedSeats = [...selectedSeats, seatId];
    }

    setSelectedSeats(updatedSeats);
    onSeatSelectionChange(updatedSeats); // Send the updated seats to the main component
  };
  return (
    <div className="seat-map-container ">
      <div className="screen pt-3">SCREEN</div>
      {seatRows.map((section, index) => (
        <div key={index} className="seat-section d-flex justify-content-center text-center">
          <div>
          <h3>{section.type} ({section.price.toLocaleString("en-in",{style:'currency',currency:"INR"})})</h3>
          {section.rows.map(row => (
            <div key={row} className="seat-row mx-2">
              <span className="row-label">{row}</span>
              {Array.from({ length: section.seatsPerRow }, (_, seatIndex) => seatIndex + 1).map(seatNumber => {
                const seatId = `${row}${seatNumber}`;
                const isSelected = selectedSeats.includes(seatId);
                return (
                  <button
                    key={seatId}
                    className={`mx-2 seat ${isSelected ? 'selected' : 'available'}`}
                    onClick={() => handleSeatClick(row, seatNumber)}
                  >
                    {seatNumber}
                  </button>
                );
              })}
            </div>
          ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SeatMap;