import React from 'react';
import { MdKeyboardBackspace } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { GoDeviceCameraVideo } from "react-icons/go";
import { FaLocationDot } from "react-icons/fa6";
import { CiShare1 } from "react-icons/ci";
import './Events.css'
import Swal from 'sweetalert2';

function EventDetails({ event, onBack }) {

  const steps = ['1', '2']
  const Queue = Swal.mixin({
    progressSteps: steps,
    confirmButtonText: 'Next >',
    // optional classes to avoid backdrop blinking between steps
    showClass: { backdrop: 'swal2-noanimation' },
    hideClass: { backdrop: 'swal2-noanimation' },
  })

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
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: 'Asia/Kolkata' // Change this to your desired timezone
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const HandleAttendEvent = () => {
    (async () => {
      await Queue.fire({
        title: 'Please Enter your Email for further Communication',
        html: `<input type="text" id="title" class="swal2-input" placeholder="This will be used to contact you for RSVPs" required>`,
        currentProgressStep: 0,
        preConfirm: () => {
          const email = document.getElementById('title').value;
          if (!email) {
            Swal.showValidationMessage('Please enter your email');
          }
        }
      })
      await Queue.fire({
        icon: 'success',
        title: 'Thank you for showing interest in this event!',
        text: 'You will be contacted by our team for further details and payment (if Paid). Till then you can make a post on the community page and let all the members know about this event .',
        confirmButtonText: 'OK',
      })
    })()
}


  return (
    <div>
      
      <div className="EventdetailsContainer">
      <MdKeyboardBackspace onClick={onBack} size={40} />
        <div className="Eventdetailsheader">
          <h2>{event.eventTitle}</h2>
          <h3>Hosted By: {event.hostedby}</h3>
        </div>
        <div className="eventDetailsContent">
          <div className="eventdetailscontentL">
            <h2>Details</h2>
            <p>{event.description}</p>
          </div>
          <div className="eventdetailscontentR">
            <div className="detailsBox">
              <div className="detailsboxDateTime">
                <IoMdTime size={25}/>
                <span>{formatDate(event.date, event.time)}</span>
              </div>
              {event.mode === 'online' ? (
                <div className="detailsboxLocation">
                  <GoDeviceCameraVideo size={25}/>
                  <span>Online Event: <br /> Link visible to Attendees</span>
                </div>
              ) : (
                <div className="detailsboxLocation">
                  <FaLocationDot size={25}/>
                  <span>Offline Event: <br /> {event.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="eventdetailsFooter">
        <div className="eventdateTime">
          <span>{formatDate(event.date, event.time)}</span>
          <h3>{event.eventTitle}</h3>
        </div>
        <div className='eventbuttons'>
          {event.paidorfree === 'Paid' ?
            (
              <span>Rs. {event.charges}</span>
            ) : (
              <span>FREE</span>
            )}
          <button>Share <CiShare1 size={20} color='#f378c1'/></button>
          <button id='attendbtn' onClick={HandleAttendEvent}>Attend {event.mode}</button>
        </div>
      </div>
    </div>

  );
}

export default EventDetails;

