import React, { useState, useEffect } from 'react';
import EventsMainPage from '../EventsComponents/EventsMainPage';

const GroupEvents = ({ admin, member }) => {
  const [Admin, setAdmin] = useState(false);

  useEffect(() => {
    if (admin) {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }, [admin]);

  return (
    <div>
      <EventsMainPage admin={Admin} member={member}/>
    </div>
  );
};

export default GroupEvents;

