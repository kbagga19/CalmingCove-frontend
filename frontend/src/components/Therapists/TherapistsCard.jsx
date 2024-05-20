import React from "react";
import classes from "./Therapists.module.css";
import { Link } from "react-router-dom";

function TherapistsCard({ img, name, designation, details, id }) {
  const handleButtonClick = () => {
    // window.open("http://127.0.0.1:5500/index.html?room=CalmingCove%20Therapy%20Support", "_blank");
  };

  return (
    <div className={classes.therapistCard}>
      <div className={classes.therapistImg}>
        <img src={img} alt='therapist pfp' />
      </div>

      <div className={classes.details}>
        <h4>{name}</h4>
        <h6>{designation}</h6>
        <p>{details}</p>
        {/* <h5>Room name: CalmingCove Therapy Support</h5> */}
        <Link className={classes.TherapistCardButton} to={`/therapist-details/${id}`}>
        <button onClick={handleButtonClick}>View Profile</button>
        </Link>
      </div>
    </div>
  );
}

export default TherapistsCard;
