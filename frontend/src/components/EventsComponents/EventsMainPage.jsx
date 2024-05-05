import React, { useState, useEffect } from 'react';
import AddNewEvent from './AddNewEvent';
import EventDetails from './EventDetails';
import './Events.css'
import online from '../../assets/online-mentorship.gif'
import offline from '../../assets/offline.png'
import { SiGooglemeet } from "react-icons/si";
import { FaLocationDot } from "react-icons/fa6";
import axiosapi from '../../services/axiosapi';
import { formatISO } from 'date-fns';
import { useParams } from 'react-router-dom';
import { RiMoneyRupeeCircleLine } from "react-icons/ri";

function EventsMainPage({ admin, member }) {
    const [showAddEvent, setShowAddEvent] = useState(false);
    const [showEventDetails, setShowEventDetails] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [EventHistory, setEventHistory] = useState([])

    const handleAddEventClick = () => {
        setShowAddEvent(true);
    };

    const handleCancelAddEvent = () => {
        setShowAddEvent(false);
    };

    const handleEventDetailsClick = (event) => {
        if(!member){
            alert('join group first!')
            return;
        }
        setSelectedEvent(event);
        setShowEventDetails(true);  
    };

    const handleBackToMainClick = () => {
        setShowEventDetails(false);
    };

    const id = useParams();

    const fetchData = async () => {
        try {
            const response = await axiosapi.get(`/groups/getEvents/${id.id}`, {
                crossDomain: true,
                headers: {
                    'Content-Type': 'application/json',
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    "MyDate": formatISO(new Date(), { representation: 'date' })
                }
            })
            if (!response.status === 200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.data;
            console.log(data);
            setEventHistory(data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const formatDate = (inputDate, inputTime) => {
        // Parse date
        const dateParts = inputDate.split('-').map(part => parseInt(part, 10));
        const year = dateParts[0];
        const month = dateParts[1] - 1; // Month is zero-based
        const day = dateParts[2];

        // Parse time
        const timeParts = inputTime.split(':').map(part => parseInt(part, 10));
        const hours = timeParts[0];
        const minutes = timeParts[1];

        const date = new Date(year, month, day, hours, minutes);
        const options = {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            timeZone: 'Asia/Kolkata' // Change this to your desired timezone
        };
        return new Intl.DateTimeFormat('en-US', options).format(date);
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
                        
                        {EventHistory.length == 0 ? (
                            <div className='noreviews noEvents'>No Upcoming Events Yet</div>
                        ) :
                            (   <>
                                {EventHistory.length === 1 ? <h2>Upcoming Events ({EventHistory.length}) </h2> : <h2>Upcoming Events ({EventHistory.length-1}+)</h2>}
                                <div className="eventCardConatiner">
                                    {EventHistory.length !== 0 && EventHistory.map((entry, index) => (
                                        <>
                                            {entry.mode === 'online' ? (
                                                <div className="EventCard">
                                                    <p id='eventdate'>{formatDate(entry.date, entry.time)}</p>
                                                    <h2>{entry.eventTitle}</h2>
                                                    <div className='onlineoffline'>
                                                        <img src={online} id="onlineimg" />
                                                        <p>Online</p>
                                                    </div>
                                                    <div id='meetlink'><SiGooglemeet /> <p>Link visible to Attendees </p></div>
                                                    <p>{entry.description.slice(0, 50)}...</p>
                                                    <div className='eventCardFooter'>
                                                        {entry.paidorfree === 'Paid' ? (
                                                            <div><RiMoneyRupeeCircleLine size={25}/><span>Entry Fee: Rs {entry.charges}</span></div>
                                                        ) : (
                                                            <div><RiMoneyRupeeCircleLine size={25}/><span>Free</span></div>
                                                        )}

                                                        <button onClick={() => handleEventDetailsClick(entry)}>See more</button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="EventCard">
                                                    <p id='eventdate'>{formatDate(entry.date, entry.time)}</p>
                                                    <h2>{entry.eventTitle}</h2>
                                                    <div className='onlineoffline'>
                                                        <img src={offline} id="offlineimg" />
                                                        <p>Offline</p>
                                                    </div>
                                                    <div id='meetlink'><FaLocationDot /> <p>{entry.location}</p></div>
                                                    <p>{entry.description.slice(0, 50)}...</p>
                                                    <div className='eventCardFooter'>
                                                        {entry.paidorfree === 'Paid' ? (
                                                            <div><RiMoneyRupeeCircleLine size={25}/><span>Entry Fee: Rs {entry.charges}</span></div>
                                                        ) : (
                                                            <div><RiMoneyRupeeCircleLine size={25}/><span>Free</span></div>
                                                        )}
                                                        <button onClick={() => handleEventDetailsClick(entry)}>See more</button>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    ))}
                                </div>
                                </>
                            )
                        }
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


