import React from "react";
import classes from "../../components/Therapists/Therapists.module.css";

function ReviewsCard({ name, imgSrc, reviewDate, reviewText, stars }) {
  return (
    <>
      <div className={classes.reviewCard}>
        <div className={classes.cardHeader}>
          <div className={classes.reviewerImg}>
            <img src={imgSrc} alt='reviewer' />
          </div>
          <div className={classes.headerData}>
            <h5>{name}</h5>
            <div className={classes.reviewStars}>
              <div>{"⭐".repeat(stars)}</div>
              <p>{reviewDate}</p>
            </div>
          </div>
        </div>
        <p>{reviewText}</p>
      </div>
    </>
  );
}

export default ReviewsCard;
