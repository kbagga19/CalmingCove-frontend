import React, { useEffect, useState } from 'react'; 
import './MoodTracker.css'; 
import {formatISO9075, formatISO} from 'date-fns';
import swal from 'sweetalert';
import axiosapi from '../../services/axiosapi';

const MoodTracker = () => { 
  const [mood, setMood] = useState('😐 Neutral'); 
  const [moodHistory, setMoodHistory] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [bedDateTime, setBedDateTime] = useState('');
  const [wakeupDateTime, setWakeupDateTime] = useState('');

  // Fetch Moods
  const fetchData = () => {
    try {
      axiosapi.get(`/extra/getMood/${localStorage.getItem('id')}`, { 
        crossDomain: true, 
        headers: { 
          'Content-Type':'application/json', 
          Accept: "application/json", 
          "Access-Control-Allow-Origin": "*", 
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          "MyDate": formatISO(new Date(), { representation: 'date' })
        }
      })
      .then((res) => {
        const data = res.data;
        console.log(data)
        setMoodHistory(data) 
      })
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // Add Mood to Db
  const handleMoodChange = async (newMood) => { 
    setMood(newMood); 
    console.log(mood) 
    console.log(moodHistory) 
  
    await axiosapi.put(`/extra/addMood/${localStorage.getItem('id')}`, {
      "mood": newMood,
      "timestamp": formatISO9075(new Date())
    }, { 
      headers: { 
        'Content-Type':'application/json', 
        Accept: "application/json", 
        "Access-Control-Allow-Origin": "*", 
        'Authorization': `Bearer ${localStorage.getItem('token')}` 
      }, 
    }); 
    fetchData();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

 
  const calculateHoursSlept = () => {
    const bedtimeDate = new Date(`${bedDateTime}`);
    const wakeupTimeDate = new Date(`${wakeupDateTime}`);
    const timeDifference = wakeupTimeDate - bedtimeDate;
    const hoursSlept = timeDifference / (1000 * 60 * 60);
    
    if (hoursSlept.toFixed(2) < 0) {
      swal("Please Enter Valid Data" , "" ,  "error")      
    } else if (hoursSlept.toFixed(2) === "NaN") {
      swal("Please Enter Some Value" , "" ,  "error")      
    } else {
      // Add Sleep
      axiosapi.put(`/extra/addSleep/${localStorage.getItem('id')}`, {
        "hours": parseInt(hoursSlept.toFixed(2)), 
        "dateTime": bedtimeDate.toISOString().split('T')[0]
      }, { 
        headers: { 
            'Content-Type':'application/json', 
            Accept: "application/json", 
            "Access-Control-Allow-Origin": "*", 
            'Authorization': `Bearer ${localStorage.getItem('token')}`, 
        },  
      }); 
    }
    alert("Sleep Added Successfully!")
    console.log(parseInt(hoursSlept.toFixed(2)))
  };

  useEffect(() => { 
    fetchData();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  },[]) 
  
  return ( 
    <>
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        // Mood Tracker
      <div className="mood-tracker">
        <div className='moodAndSleep'>
        <div className='moods'>
          <h3>How are you feeling?</h3>
          <div className="mood-buttons">
            <button onClick={() => handleMoodChange('😊 Happy')}>😊 Happy</button>
            <button onClick={() => handleMoodChange('😐 Neutral')}>😐 Neutral</button>
            <button onClick={() => handleMoodChange('😞 Sad')}>😞 Sad</button>
          </div>
        </div>
        {/* Sleep Tracker */}
        <div className='sleepTime'>
          <h3>Sleep Tracker</h3>
          <form>
            <label>
              Bedtime :
              <input type="datetime-local" value={bedDateTime} onChange={(e) => setBedDateTime(e.target.value)} />
            </label>
            
            <label>
              Wake-up time :
              <input type="datetime-local" value={wakeupDateTime} onChange={(e) => setWakeupDateTime(e.target.value)} />
            </label>

            <button type="button" onClick={calculateHoursSlept}>
              Add Sleep
            </button>
          </form>
        </div>
        </div>
        <div className="mood-history">
          <h3>Mood History</h3>
          {moodHistory.length !== 0 ? (
            <ul className='listMoodHistory'>
              {moodHistory.map((entry, index) => (
                <li key={index}>
                  <strong>{entry.mood}</strong><br/> on {entry.timestamp}
                  <hr style={{marginTop: '10px'}}/>
                </li>
              ))}
            </ul>
          ) : (
            <ul className='listMoodHistory'>
              <li>No Record!</li>
            </ul>
          )}
        </div>
      </div>
    )}
  </>
  );
}

export default MoodTracker;