import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer.jsx";
import classes from "../../components/Therapists/Therapists.module.css";
import { Link } from "react-router-dom";
import checkmark from "../../assets/check-mark.png";
import { FaArrowRight } from "react-icons/fa";
import ReviewsCard from "../../components/Therapists/ReviewsCard.js";
import therapist1 from "../../assets/TherapistsImages/therapist1.jpg";
import reviewerPfp from "../../assets/reviewer.jpg";

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
  return (
    <>
      <Navbar />
      <div className={classes.therapistDetailsWrapper}>
        <section className={classes.therapistBanner}>
          <div className={classes.detailsView}>
            <div className={classes.basicDetails}>
              <div className={classes.detailsLeft}>
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
            </div>
          </div>
        </section>

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
