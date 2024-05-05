import React, { useState, useEffect } from 'react'
import '../../styles/Community.css'
import Navbar from '../../components/Navbar/Navbar'
import Support from '../../assets/SupportNew.jpg';
import GroupCard from '../../components/GroupCard/GroupCard.jsx';
import { Link, useParams } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import axiosapi from '../../services/axiosapi.js';

const Community = () => {
    const [mentalActive, setMentalActive] = useState(true);
    const [physicalActive, setPhysicalActive] = useState(false);
    const [isMentalActive, setIsMentalActive] = useState(false);
    const [isPhysicalActive, setIsPhysicalActive] = useState(false);
    const [groupsData, setGroupsData] = useState([]);

    //functions to toggle between physical and mental categories
    const mentalButtonPressed = () => {
        setMentalActive(true);
        setPhysicalActive(false);

        if (isMentalActive) {
            setIsMentalActive(false);
            setIsPhysicalActive(true);
        }
        setIsPhysicalActive(false);
    }

    const physicalButtonPressed = () => {
        setMentalActive(false);
        setPhysicalActive(true);

        if (isPhysicalActive) {
            setIsPhysicalActive(false);
            setIsMentalActive(false);
        } else {
            setIsPhysicalActive(true);
            setIsMentalActive(true);
        }
    }

    //fetching the details of all the support groups to display on the community page
    useEffect(() => {
        axiosapi.get('/groups/supportGroups', {
            crossDomain: true,
            headers: {
                'Content-Type':'application/json',
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",    
            },    
        })
        .then((res) => {
            const data = res.data;
            console.log(data);
            setGroupsData(data);
        });
    }, []);

    return (
        <div>
            <Navbar />
            <div className='communityMain'>
                {localStorage.getItem('result') < 40 && (
                    <div className="startgrpbtn">
                        <Link to={{ pathname: `/startgroup` }}>
                            <button>Start A New Support Group</button>
                        </Link>
                    </div>
                )}
                <div className='communityTop'>
                    <div className='communityTopLeft'>
                        <img src={Support} alt="" />
                    </div>
                    <div className='communityTopRight'>
                        <h1>Join A Mental Health Support Group</h1>
                        <p>Meet other people interested in Mental Health Support: <br/><h3>Share Experiences, Inspire and Encourage Each Other!</h3></p>
                        {/* <div className="supportmembers">
                            <div className="supportmembersleft">12000 members</div>
                            <div className="supportmembersright">{groupsData.length}+ groups</div>
                        </div> */}
                        {/* <h2>Which support group you would like to join?</h2>
                        <div className='categoryButtons'>
                            <button onClick={mentalButtonPressed} className={isMentalActive ? 'mentalButton' : ''}>Mental</button>
                            <button onClick={physicalButtonPressed} className={isPhysicalActive ? 'physicalButton' : ''}>Physical</button>
                        </div> */}
                    </div>
                </div>
                <div className='communityBottom'>
                    {mentalActive ?
                        groupsData
                            .filter((data) => data.type === 'mental')
                            .map((data) => (
                                <Link style={{ textDecoration: 'none', color: 'black' }} to={{ pathname: `/groupdesc/${data._id}` }}>
                                    <GroupCard {...data} key={data._id} />
                                </Link>
                            )) :

                        (physicalActive && (
                            groupsData
                                .filter((data) => data.type === 'physical')
                                .map((data) => (
                                    <Link style={{ textDecoration: 'none', color: 'black' }} to={{ pathname: `/groupdesc/${data._id}` }}>
                                        <GroupCard {...data} key={data._id} />
                                    </Link>
                                ))
                        ))
                    }
                </div>
            <Footer/>
            </div>
        </div>
    )
}

export default Community