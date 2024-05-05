import React, { useState } from 'react';
import './Events.css';
import { uid } from 'uid';
import { useParams } from 'react-router-dom';
import axiosapi from '../../services/axiosapi';


const AddNewEvent = ({ onCancel }) => {
  const [eventData, setEventData] = useState({
    EventID: '',
    title: '',
    description: '',
    date: '',
    time: '',
    hostedby: '',
    mode: '',
    location: '',
    PaidorFree: '',
    charges: '',
    link: '',
  });

  const handleCancelClick = () => {
    onCancel();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value,
      "EventID": uid(16),
    });
  };

  const id = useParams();

  const handleSubmit = async () => {
    const response = await axiosapi.put(`/groups/addEvent/${id.id}`, {
      "EventID": eventData.EventID,
      "EventTitle": eventData.title,
      "description": eventData.description,
      "hostedby": eventData.hostedby,
      "location": eventData.location,
      "paidorfree": eventData.PaidorFree,
      "mode": eventData.mode,
      "charges": eventData.charges,
      "link": eventData.link,
      "date": eventData.date,
      "time": eventData.time,
    }, {
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.status === 200) {
      alert("Event added Successfully! You will be contacted by our team after review!");
    } else {
      alert("Error!");
    }

    //fetchData();

    setEventData({
      EventID: '',
      title: '',
      description: '',
      date: '',
      time: '',
      hostedby: '',
      mode: '',
      location: '',
      PaidorFree: '',
      charges: '',
      link: '',
    })
  }


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
          <label>Free or Paid:</label>
          <select
            name="PaidorFree"
            value={eventData.PaidorFree}
            onChange={handleChange}
          >
            <option value="">Select:</option>
            <option value="Paid">Paid</option>
            <option value="Free">Free</option>
          </select>
        </div>

        {eventData.PaidorFree === 'Paid' && (
          <div className="form-group">
            <label>Charges:</label>
            <input
              type="number"
              name="charges"
              value={eventData.charges}
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
          <button type="submit" onClick={handleSubmit}>Submit</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>

      </form>
    </div>
  );
};

export default AddNewEvent;
