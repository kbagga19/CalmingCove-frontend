// import React from 'react'
// import { Link } from 'react-router-dom'
// import Test from '../../assets/testimg-2-2.png'

// const TestSection = () => {
//   return (
//     <div>
// {/* <div className="testcontainer">
// <div className="testcontainerLeft">
//   <img src={Test}/>
// </div>
//   <div className="testcontainerRight">
//     <div className="testheading"><span>Self Assessment Test</span></div>
//     <div className='testsubheading'>
//       <span></span>
//       <span id='testsubheadingbold'>Mental health conditions, such as depression or anxiety, are real, common and treatable. And recovery is possible.</span>
//       <button>
//         <Link to={{ pathname: "/categories" }} style={{ textDecoration: "none", color: "#fff" }}>Take a Test</Link>
//       </button>
//     </div>

//     <div className="helpline">
//       <span><span id='testsubheadingbold'>Please Note:</span>This website is an informational resource. We are not a crisis support line. If you need immediate help, you can reach the Suicide & Crisis Lifeline by calling 1800-121-3667 or emergency number 112. You can also text “HELP” to 741-741 to reach the Crisis Text Line. Warmlines are an excellent place for non-crisis support.</span>
//       <span>For all other screening-related questions and non-emergency support, please use Mindwell’s Contact Us form.</span>
//     </div>
//   </div>


// </div> */}
//     </div>
//   )
// }

// export default TestSection


import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import axiosapi from '../../services/axiosapi';
import HomePageTest from '../HomePageComponents/HomePageTest';
import HomePageTherapist from '../HomePageComponents/HomePageTherapists';
import HomePageBlogs from '../HomePageComponents/HomePageBlogs';
import HomePageSupport from '../HomePageComponents/HomePageSupport';


const SliderHomeComponent = () => {
  const sectionsRef = useRef([]);
  const containerRef = useRef(null);

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (containerRef.current) {
      gsap.to(sectionsRef.current, {
        xPercent: -100 * (sectionsRef.current.length - 1),
        ease: 'sine-out',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1 / (sectionsRef.current.length - 1),
          end: () => '+=' + 1500,
        },
      });
    }
  }, []);

  //fetch the data of all the posts to display on the main page
  const fetchData = () => {
    axiosapi.get('/blog/allPosts', {
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
      setBlogs(data);
    });
  }

  //loading
  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div ref={containerRef} style={{ width: '100vw', height: '120vh', overflow: 'auto', overflowX: 'hidden', backgroundColor: '#fefefe', display: 'flex', alignItems: 'center'}}>
      <div style={{ display: 'flex', width: '400vw', height: '100vh' }}>
        <div ref={el => (sectionsRef.current[0] = el)} style={{ flex: '1 0 0', minWidth: '100vw', height: '100%', backgroundColor: '#fefefe' }}>
          
          <HomePageTest/>
        </div>
        <div ref={el => (sectionsRef.current[1] = el)} style={{ flex: '1 0 0', minWidth: '100vw', height: '100%', backgroundColor: '#fefefe' }}>
          <HomePageTherapist/>
        </div>
        <div ref={el => (sectionsRef.current[2] = el)} style={{ flex: '1 0 0', minWidth: '100vw', height: '100%', backgroundColor: '#fefefe' }}>
        <HomePageSupport/>
        </div>
        <div ref={el => (sectionsRef.current[3] = el)} style={{ flex: '1 0 0', minWidth: '100vw', height: '100%', backgroundColor: '#fefefe' }}>
          <HomePageBlogs/>
        </div>
      </div>
    </div>
  );
};

export default SliderHomeComponent;
