import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer.jsx";
import classes from "../../components/Therapists/Therapists.module.css";
import { Link, useParams } from "react-router-dom";
import checkmark from "../../assets/check-mark.png";
import { FaArrowRight } from "react-icons/fa";
import ReviewsCard from "../../components/Therapists/ReviewsCard.js";
import therapist1 from "../../assets/TherapistsImages/therapist1.jpg";
import reviewerPfp from "../../assets/reviewer.jpg";
import axiosapi from '../../services/axiosapi';
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import emailjs from '@emailjs/browser';
import swal from "sweetalert";

const reviewData = [
  {
    name: "Jyotpreet Kaur",
    imgSrc: reviewerPfp,
    reviewDate: "2 weeks ago",
    reviewText:
      "I finally took the plunge to undergo therapy with Calming Cove. My Counseling Psychologist, helped me get over my traumas Now, I am in better place in life.You are all doing an exceptional job! I wholeheartedly endorse Calming Cove to anyone seeking support for their mental well-being.",
    stars: 5,
  },
  {
    name: "Rahul Sharma",
    imgSrc: reviewerPfp,
    reviewDate: "1 month ago",
    reviewText:
      "My friend recommended Calming Cove to me and I thank heavens for that. My counselor is Godsent! I have much lesser episodes of anxiety and as and when they appear, I am able to handle them. You guys are doing such a great job. I would recommend Calming Cove to all those who need help with their mental health.",
    stars: 4,
  },
  {
    name: "Anita Joshi",
    imgSrc: reviewerPfp,
    reviewDate: "3 weeks ago",
    reviewText:
      "I have been using this platform for 3 months now and my experience has been life changing already. I feel more in sync with myself. I have a really deep appreciation for my counsellor. The platform in itself is pretty smooth, booking and managing sessions is pretty straight forward. I would highly recommend Calming Cove.",
    stars: 5,
  },
  {
    name: "Vikram Singh",
    imgSrc: reviewerPfp,
    reviewDate: "2 days ago",
    reviewText:
      "Dr. Emily has a wonderful approach to therapy. I felt very comfortable and understood during our sessions. It's difficult to express in words the positive impact she has had in my life. She's like a rock in my life, always patient, kind, compassionate and honest. I just feel extremely privileged and lucky to have Janvi in my life. We could definitely use more therapists like her in the world.",
    stars: 4,
  },
  {
    name: "Priya Mehta",
    imgSrc: reviewerPfp,
    reviewDate: "5 days ago",
    reviewText:
      "Dr. Rachel has been incredibly helpful. His guidance has made a significant impact on my life. I've been taking these counseling sessions for over 6 months now. My counselor has made my life easier. I'd recommend Calming Cove to anyone who is seeking a counseling for relationship to anxiety, etc.",
    stars: 5,
  },
  {
    name: "Suresh Kumar",
    imgSrc: reviewerPfp,
    reviewDate: "1 week ago",
    reviewText:
      "Dr. Michael is very professional and compassionate. Highly recommended. My therapist helped me identify & understand aspects of my personality which would have never occurred to me. I am motivated to go back every week for our sessions and keep doing the work. ",
    stars: 5,
  },
  {
    name: "Aarti Sharma",
    imgSrc: reviewerPfp,
    reviewDate: "3 days ago",
    reviewText:
      "Dr. Emily helped me navigate through a very tough period in my life. I'm very grateful for her support. I came to Calming Cove at a very low point in my life. It has been a journey and a half. I highly recommend people to seek therapy in case your life isn't doing well, I wasn't well but I am better now and I am glad I took the step to seek help.",
    stars: 5,
  },
  {
    name: "Nikhil Agarwal",
    imgSrc: reviewerPfp,
    reviewDate: "1 week ago",
    reviewText:
      "Dr. Michael was amazing throughout my therapy sessions. His understanding and patience helped me open up and deal with my issues effectively. The progress I made was beyond my expectations. I strongly recommend his services to anyone looking for emotional and mental support.",
    stars: 5,
  },
  {
    name: "Meera Patel",
    imgSrc: reviewerPfp,
    reviewDate: "4 days ago",
    reviewText:
      "Dr. Rachel provided excellent guidance during our sessions. His insights and methods were very effective in helping me manage my stress and anxiety. He created a safe and welcoming environment where I felt comfortable sharing my feelings. I highly recommend him as a therapist.",
    stars: 5,
  },
];

function TherapistDetails() {
  const [therapistDetails, setTherapistsDetails] = useState([]);
  const [Appointments, setAppointments] = useState([]);
  const [BookAppointmentButton, setBookAppointmentButton] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const id = useParams();

  const meetLink = `http://127.0.0.1:5500/index.html?room=${id.id}`;

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      axiosapi.get(`/therapists/${id.id}`, {
        crossDomain: true,
        headers: {
          'Content-Type': 'application/json',
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      })
        .then((res) => {
          const data = res.data;
          console.log(data);
          setTherapistsDetails(data);
        })
    }
  }, []);

  const fetchData = async () => {
    try {
      if (localStorage.getItem('token') !== null) {
        axiosapi.get(`/therapists/getAppointments/${id.id}`, {
          crossDomain: true,
          headers: {
            'Content-Type': 'application/json',
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        })
          .then((res) => {
            const data = res.data;
            console.log(data);
            setAppointments(data);
          })
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])



  const handleSelect = (appointment) => {
    if (appointment.availability) {
      setSelectedAppointment(appointment);
    } else {
      //alert('This appointment is not available.');
    }
  };

  async function handleBook() {
    if (selectedAppointment) {
      console.log('Booked appointment:', selectedAppointment.timestamp);

      const formattedDate = formatDate(selectedAppointment.timestamp);

      emailjs.send("service_wakzvca","template_g7q7yco",{
        user_name: localStorage.getItem('name'),
        timestamp: formattedDate,
        therapist_name: therapistDetails.name,
        meet_link: meetLink,
        user_email: localStorage.getItem('email'),
      }, "W6vv5FFrgOHL5ZovX");

      const response = await axiosapi.put(`/therapists/updateAppointment/${id.id}`,
        selectedAppointment.timestamp,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        })
      if (response.status === 200) {
        swal("Appointment Booked Successfully!", "You will recieve the meeting details along with the link on your registered email id. Contact us at CalimgCove@gmail.com", "success");
      }
      setSelectedAppointment(null);
    } else {
      alert('Please select an appointment to book.');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Get day of the week
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = days[date.getDay()];

    // Get month name
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthIndex = date.getMonth();
    const monthName = months[monthIndex];

    // Get time
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${monthName} ${date.getDate()}, ${dayOfWeek}, ${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  return (
    <>
      <Navbar />
      <div className={classes.therapistDetailsWrapper}>
        <section className={classes.therapistBanner}>
          <div className={classes.detailsView}>
            <div className={classes.basicDetails}>
              <div className={classes.detailsLeft}>
                <img src={therapist1} alt="Therapist 1" className={classes.therapistcircleimg} />
                <div className={classes.leftAbout}>
                  <img src='https://www.betterlyf.com/images/quote.svg' alt='quotes' />

                  <div>
                    <p className={classes.count}>
                      <span>1K+</span>Sessions Taken
                    </p>
                    <p>Consultation mode: Online</p>
                    {/* <p>Mondays, Wednesdays, Fridays</p> */}
                  </div>
                </div>
              </div>
              <div className={classes.detailsRight}>
                <h2>{therapistDetails.name}</h2>
                <div className={classes.therapistRating}>
                  <FaStar color='#faaf00' />
                  <FaStar color='#faaf00' />
                  <FaStar color='#faaf00' />
                  <FaStar color='#faaf00' />
                  <FaStarHalfAlt color='#faaf00' />
                </div>
                <h3>{therapistDetails.designation}</h3>
                <p>{therapistDetails.details}</p>
                <div className={classes.detailsRightbtn}>
                  <button onClick={() => { setBookAppointmentButton(!BookAppointmentButton) }}>Book an Appointment</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {BookAppointmentButton ? (
          <section className={classes.AppointmentSection}>
            <h1>Select A Slot</h1>
            <div className={classes.appointmentContainer}>
              {Appointments.map((item) => (
                <div
                  className={classes.appointmentBox}
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  style={{
                    border: item.availability ? (selectedAppointment === item ? '2px solid blue' : '2px solid black') : '2px solid grey',
                    color: item.availability ? (selectedAppointment === item ? 'blue' : 'black') : 'grey',
                    cursor: item.availability ? 'pointer' : 'not-allowed',
                  }}
                >
                  <span>{formatDate(item.timestamp)}</span>
                </div>
              ))}
            </div>
            <div className={classes.note}>
              <p>Please note: If all the appointments are already filled, kindly check again on Sunday to book your slots for next week :)</p>
            </div>
            <div className={classes.schedulebtn}>
              <button onClick={handleBook}>Schedule Meeting</button>
            </div>

          </section>
        ) : (
          <></>
        )}



        <section className={classes.getPlatinum}>
          <div className={classes.aboutPlan}>
            <h1>Get Counselling</h1>
            <p>Access personalized guidance from certified therapists for effective strategies tailored to your needs and concerns.</p>
            <div className='testList'>
              <div className='testListItem'>
                <img src={checkmark} />
                <p>
                  <span>Professional Expertise:</span> Benefit from the knowledge, skills, and expertise of trained professionals who specialize in
                  mental health and emotional well-being.
                </p>
              </div>
              <div className='testListItem'>
                <img src={checkmark} />
                <p>
                  <span>Personalized Guidance</span> Work one-on-one with a certified therapist who can tailor strategies and interventions to address
                  your specific challenges and goals.
                </p>
              </div>
              <div className='testListItem'>
                <img src={checkmark} />
                <p>
                  <span>Safe Space to Express:</span> Counseling provides a confidential environment where you can openly express your thoughts,
                  feelings, and experiences without fear of judgment.
                </p>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className='plancard'>
              <div className='planinner'>
                <span className='planpricing'>
                  <span>
                    ₹5000 <small>/ m</small>
                  </span>
                </span>
                <p className='plantitle'>Platinum Membership</p>
                <p className='planinfo'>Unlock everything: personalized counseling, tailored plans, progress tracking.</p>
                <ul className='planfeatures'>
                  <li>
                    <span className='planicon'>
                      <svg height='24' width='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M0 0h24v24H0z' fill='none'></path>
                        <path fill='currentColor' d='M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z'></path>
                      </svg>
                    </span>
                    <span>
                      Get <strong>Counseling</strong> from Verified Licensed Therapists
                    </span>
                  </li>
                  <li>
                    <span className='planicon'>
                      <svg height='24' width='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M0 0h24v24H0z' fill='none'></path>
                        <path fill='currentColor' d='M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z'></path>
                      </svg>
                    </span>
                    <span>Take a Mental Health Test</span>
                  </li>
                  <li>
                    <span className='planicon'>
                      <svg height='24' width='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M0 0h24v24H0z' fill='none'></path>
                        <path fill='currentColor' d='M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z'></path>
                      </svg>
                    </span>
                    <span>
                      Join <strong>Support Groups</strong>
                    </span>
                  </li>
                  <li>
                    <span className='planicon'>
                      <svg height='24' width='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M0 0h24v24H0z' fill='none'></path>
                        <path fill='currentColor' d='M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z'></path>
                      </svg>
                    </span>
                    <span>Get access to Printable Worksheets & Blogs</span>
                  </li>
                </ul>
                <div className='planaction'>
                  <Link to={{ pathname: `/payment/${5000}` }} className='planbutton'>
                    Choose plan
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={classes.statInfo}>
          <div className={classes.statContainer}>
            <div className={classes.statMain}>
              <div className={classes.stat1}>
                <span>icon</span>
                <h3>2,000+</h3>
                <p>Sessions Delivered</p>
              </div>

              <div className={classes.stat1}>
                <span>icon</span>
                <h3>70%</h3>
                <p>Repeat Clients</p>
              </div>

              <div className={classes.stat1}>
                <span>icon</span>
                <h3>100+</h3>
                <p>Corporate Partners</p>
              </div>

              <div className={classes.stat1}>
                <span>icon</span>
                <h3>100%</h3>
                <p>Confidential</p>
              </div>
            </div>
          </div>
        </section>

        <section className={classes.reviewSection}>
          <div className={classes.reviewContainer}>
            <h3>Calming Cove Online Counselling Reviews</h3>
            <div className={classes.reviewScroller}>
              <div className={classes.reviewsMain}>
                {reviewData.map((review) => (
                  <ReviewsCard
                    name={review.name}
                    imgSrc={review.imgSrc}
                    reviewDate={review.reviewDate}
                    reviewText={review.reviewText}
                    stars={review.stars}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

export default TherapistDetails;
