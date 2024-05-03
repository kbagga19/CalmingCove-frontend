import React from 'react'
import './HomePageComponents.css'
import Therapist1 from '../../assets/TherapistsImages/therapist1.jpg';
import Therapist2 from '../../assets/TherapistsImages/therapist2.jpg';
import Therapist3 from '../../assets/TherapistsImages/therapist3.jpg';

const HomePageTherapists = () => {
  return (
    <div>
      <div className="TherapistContainerOuter">
            <span id='TherapyHeading'>Therapy Is As Good As Your Therapist</span>
            <div className='TherapistContainerInner'>
              <div className="TherapistLeft">
                <h2>Qualified & Trained Psychologists Only</h2>
                <p>All our online counsellors hold a Masters Degree in Psychology and undergo over <span>400+</span> hours of rigorous <span>training and supervision</span>. With expertise in various psychotherapeutic techniques, they have assisted <span>5Lac+ clientsto</span> deal with the toughest life challenges and thrive in personal and professional space.</p>
                <div className='Therapistbtn'>
                  <button>View All Counsellors</button>
                </div>
              </div>
              <div className="TherapistRight">
                <div className="therapists-container">
                  <img src={Therapist1} alt="Therapist 1" className="therapist-circle" />
                  <img src={Therapist2} alt="Therapist 2" className="therapist-circle" />
                  <img src={Therapist3} alt="Therapist 3" className="therapist-circle" />
                </div>
              </div>
            </div>
          </div>
    </div>
  )
}

export default HomePageTherapists
