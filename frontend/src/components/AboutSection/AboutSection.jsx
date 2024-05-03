// import React from "react";
// import Search from "../../assets/search.png";
// import Plan from "../../assets/plan.png";
// import Group from "../../assets/group.png";
// import Reward from "../../assets/reward.png";
// import { FaArrowRight } from "react-icons/fa";

// const AboutSection = () => {
//   return (
//     <div>
//       <div className="aboutcontainer">
//         <div className="aboutheading">
//           <span>How MindWell Works?</span>
//         </div>
//         <div className="howitworkscontainer">
//           <div className="workscard">
//             <img src={Search} id="workcardimg" />
//             <span>Take a Mental Health test</span>
//             <p>
//               Discover your emotional well-being with our confidential
//               screening. Take the first step towards understanding your mental
//               health.
//             </p>
//             <button>
//               Learn more <FaArrowRight />
//             </button>
//           </div>
//           <div className="workscard">
//             <img src={Plan} id="workcardimg" />
//             <span>Follow the Plan</span>
//             <p>
//               Commit to your mental health journey. Stick to your personalized
//               treatment plan for progress and lasting well-being.
//             </p>
//             <button>
//               Learn more <FaArrowRight />
//             </button>
//           </div>
//           <div className="workscard">
//             <img src={Group} id="workcardimg" />
//             <span>Join Support Groups</span>
//             <p>
//               Gain encouragement and insights by joining supportive groups for
//               shared experiences and understanding.
//             </p>
//             <button>
//               Learn more <FaArrowRight />
//             </button>
//           </div>
//           <div className="workscard">
//             <img src={Reward} id="workcardimg" />
//             <span>Get Counseling</span>
//             <p>
//               Access personalized guidance from certified therapists for
//               effective strategies tailored to your needs and concerns.
//             </p>
//             <button>
//               Learn more <FaArrowRight />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AboutSection;


import React from 'react'
import aboutimg from "../../assets/aboutimag.jpg";
import './AboutSection.css'
import { FaArrowRight } from "react-icons/fa";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from "react";
import checkmark from '../../assets/check-mark.png'


// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {

  useEffect(() => {
    ScrollTrigger.create({
      trigger: ".Aboutgallery",
      start: "top top",
      end: "bottom bottom",
      pin: ".AboutSectionright",
    })
  }, [])

  return (
    <div>
      <div className="Aboutgallery">
        <div className="AboutSectionright">
          <img src={aboutimg} />
        </div>
        <div className="AboutSectionleft">
          <div className="AboutContent">
            <div className="AboutContentSection">
              <h1>Take a Mental Health Test</h1>
              <p>Discover your emotional well-being with our confidential screening.
                Take the first step towards understanding your mental health.</p>
              <p>Why take the Test:</p>
              <div className='testList'>
                <div className='testListItem'>
                  <img src={checkmark} />
                  <p><span>Early Detection:</span> Detect potential mental health concerns early, allowing for timely intervention and support.</p>
                </div>
                <div className='testListItem'>
                  <img src={checkmark} />
                  <p><span>Increased Awareness:</span> Enhance your awareness of mental health issues and reduce stigma surrounding seeking help.</p>
                </div>
                <div className='testListItem'>
                  <img src={checkmark} />
                  <p><span>Holistic Well-being:</span> Embrace a holistic approach to well-being by prioritizing your mental health alongside your physical health.</p>
                </div>

              </div>
              <button>
                Learn more <FaArrowRight />
              </button>
            </div>
            <div className="AboutContentSection">
              <h1>Follow the Plan</h1>
              <p>
                Commit to your mental health journey. Stick to your personalized
                treatment plan for progress and lasting well-being.
              </p>
              <div className='testList'>
                <div className='testListItem'>
                  <img src={checkmark} />
                  <p><span>Personalized Care:</span> Your treatment plan is tailored specifically to your needs and goals, ensuring that you receive the most effective support.</p>
                </div>
                <div className='testListItem'>
                  <img src={checkmark} />
                  <p><span>Track Your Progress:</span> Monitoring your journey allows you to track your progress over time, celebrating victories and making adjustments as needed.</p>
                </div>
                <div className='testListItem'>
                  <img src={checkmark} />
                  <p><span>Empowerment Through Action: </span> By committing to your plan, you take proactive steps towards improving your mental health and reclaiming control over your life.</p>
                </div>
              </div>
              <button>
                Learn more <FaArrowRight />
              </button>
            </div>
            <div className="AboutContentSection">
              <h1>Join Support Groups</h1>
              <p>
                Gain encouragement and insights by joining supportive groups for
                shared experiences and understanding.
              </p>
              <div className='testList'>
                <div className='testListItem'>
                  <img src={checkmark} />
                  <p><span>Community Connection:</span> Engage with individuals who understand and empathize with your experiences, creating a sense of belonging and camaraderie..</p>
                </div>
                <div className='testListItem'>
                  <img src={checkmark} />
                  <p><span>Emotional Support:</span> Receive encouragement, validation, and practical advice from peers who have walked similar paths and can offer invaluable insights.</p>
                </div>
                <div className='testListItem'>
                  <img src={checkmark} />
                  <p><span>Shared Learning: </span> Benefit from diverse perspectives and collective wisdom, expanding your knowledge and understanding of mental health topics.</p>
                </div>
              </div>
              <button>
                Learn more <FaArrowRight />
              </button>
            </div>
            <div className="AboutContentSection">
              <h1>Get Counseling</h1>
              <p>
                Access personalized guidance from certified therapists for
                effective strategies tailored to your needs and concerns.
              </p>
              <div className='testList'>
                <div className='testListItem'>
                  <img src={checkmark} />
                  <p><span>Professional Expertise:</span> Benefit from the knowledge, skills, and expertise of trained professionals who specialize in mental health and emotional well-being.</p>
                </div>
                <div className='testListItem'>
                  <img src={checkmark} />
                  <p><span>Personalized Guidance</span> Work one-on-one with a certified therapist who can tailor strategies and interventions to address your specific challenges and goals.</p>
                </div>
                <div className='testListItem'>
                  <img src={checkmark} />
                  <p><span>Safe Space to Express:</span> Counseling provides a confidential environment where you can openly express your thoughts, feelings, and experiences without fear of judgment.</p>
                </div>
              </div>
              <button>
                Learn more <FaArrowRight />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AboutSection
