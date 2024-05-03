import React from 'react';

function EventDetails({ event, onBack }) {
  return (
    <div>
        <h1>Event Details</h1>
      <button onClick={onBack}>Back</button>
    </div>
  );
}

export default EventDetails;

