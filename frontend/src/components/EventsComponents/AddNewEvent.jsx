import React, { useState } from 'react';
import './Events.css';


const AddNewEvent = ({onCancel}) => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    hostedby: '',
    mode: '',
    location: '',
    link: '',
  });

  const handleCancelClick = () => {
    onCancel();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  return (
    <div className="eventform-container">
      <h2>Create Event</h2>
      <form>
        <div className="eventform-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={eventData.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={eventData.date}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Time:</label>
          <input
            type="time"
            name="time"
            value={eventData.time}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Hosted By:</label>
          <input
            type="text"
            name="hostedby"
            value={eventData.hostedby}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Mode:</label>
          <select
            name="mode"
            value={eventData.mode}
            onChange={handleChange}
          >
            <option value="">Select Mode</option>
            <option value="offline">Offline</option>
            <option value="online">Online</option>
          </select>
        </div>
        {eventData.mode === 'offline' && (
          <div className="form-group">
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={eventData.location}
              onChange={handleChange}
            />
          </div>
        )}
        {eventData.mode === 'online' && (
          <div className="form-group">
            <label>Link:</label>
            <input
              type="text"
              name="link"
              value={eventData.link}
              onChange={handleChange}
            />
          </div>
        )}

        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={eventData.description}
            onChange={handleChange}
          />
        </div>

        <div className="AddNewEventbtn">
          <button type="submit">Submit</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
        
      </form>
    </div>
  );
};

export default AddNewEvent;
