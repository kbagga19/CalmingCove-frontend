import React, { useState } from 'react';
import AddNewEvent from './AddNewEvent';
import EventDetails from './EventDetails';
import './Events.css'
import online from '../../assets/online-mentorship.gif'
import offline from '../../assets/offline.png'
import { SiGooglemeet } from "react-icons/si";
import { FaLocationDot } from "react-icons/fa6";

function EventsMainPage({ admin }) {
    const [showAddEvent, setShowAddEvent] = useState(false);
    const [showEventDetails, setShowEventDetails] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleAddEventClick = () => {
        setShowAddEvent(true);
    };

    const handleCancelAddEvent = () => {
        setShowAddEvent(false);
    };

    const handleEventDetailsClick = (event) => {
        setSelectedEvent(event);
        setShowEventDetails(true);
    };

    const handleBackToMainClick = () => {
        setShowEventDetails(false);
    };


    return (
        <div>
            {!showAddEvent && !showEventDetails ? (
                <div>
                    {admin &&
                    <div className="addEventbtn">
                        <button onClick={handleAddEventClick}>Add Event</button>
                    </div>
                    }
                    <div className="eventsContainer">
                        <h2>Upcoming Events (4+) </h2>
                        <div className="eventCardConatiner">
                            <div className="EventCard">
                                
                                <p id='eventdate'>WED, MAY 8, 2024, 4:30 AM IST</p>
                                <h2>Awareness Games and Meditations on Zoom</h2>
                                <div className='onlineoffline'>
                                <img src={online} id="onlineimg" />
                                <p>Online</p>
                                </div>
                                <p>Awareness Games</p>
                                <div id='meetlink'><SiGooglemeet/> <p>Link visible to Attendees </p></div>
                                <div className='eventCardFooter'>
                                    <p>21+ attendees</p>
                                    <button>See more</button>
                                </div>
                            </div>

                            <div className="EventCard">
                                <p id='eventdate'>WED, MAY 8, 2024, 4:30 AM IST</p>
                                <h2>Awareness Games and Meditations on Zoom</h2>
                                <div className='onlineoffline'>
                                <img src={offline} id="offlineimg" />
                                <p>Offline</p>
                                </div>
                                <p>Awareness Games</p>
                                <div id='meetlink'><FaLocationDot/> <p>Central Park, New York </p></div>
                                <div className='eventCardFooter'>
                                    <p>21+ attendees</p>
                                    <button>See more</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    {showAddEvent &&
                        <AddNewEvent onCancel={handleCancelAddEvent} />
                    }
                    {showEventDetails &&
                        <EventDetails event={selectedEvent} onBack={handleBackToMainClick} />
                    }
                </>

            )}
        </div>
    );
}

export default EventsMainPage;


//<button onClick={() => handleEventDetailsClick('')}>More Details</button>



