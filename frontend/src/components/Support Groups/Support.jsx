import React from 'react'
import { useState, useEffect } from 'react';
import './Support.css'
import GroupDashboard from './GroupDashboard';
import axiosapi from '../../services/axiosapi';

const Support = () => {
    const [groups, setgroups] = useState([]); 

    // Get Groups Joined
    const fetchData = async () => {
      try {
        const response = await axiosapi.get(`/extra/getJoinedGroups/${localStorage.getItem('id')}`, { 
          crossDomain: true, 
          headers: { 'Content-Type':'application/json', 
            Accept: "application/json", 
            "Access-Control-Allow-Origin": "*", 
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
          } 
        })
        if (!response.status === 200) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.data
        setgroups(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    
    useEffect(() => { 
      fetchData();
    },[groups])

  return (
    <div>
        <div className="supportcontainer">
            <h3>Your Support Groups</h3>
          {
            groups.length === 0 ? (
              <h5>Join group first!</h5>
            ) : (
              groups.map((groupId) => (
                <GroupDashboard key={groupId} groupId={groupId}/>
              ))
            )
          }
        </div>
    </div>
  )
}

export default Support
