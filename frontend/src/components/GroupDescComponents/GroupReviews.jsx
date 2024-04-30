import React from 'react'
import { useState, useEffect } from 'react';
import { IoClose } from "react-icons/io5";
import { uid } from 'uid';
import { useParams } from 'react-router-dom';
import axiosapi from '../../services/axiosapi';
import { formatISO9075, formatISO } from 'date-fns';
import { differenceInMinutes, formatDistanceToNow } from 'date-fns';
import Reviews from '../ReviewsSection/Reviews'

const GroupReviews = ({ isMember }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewHistory, setReviewHistory] = useState([]);
  const [ReviewDetails, setReviewDetails] = useState({
    reviewID: '',
    username: localStorage.getItem('name'),
    rating: 0,
    review: '',
    timestamp: '',
  })

  const openReviewModal = () => {
    setIsModalOpen(true);
  }

  const closeReviewModal = () => {
    setIsModalOpen(false);
  }

  const id = useParams();

  const sortedReviews = reviewHistory ? reviewHistory.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) : '';

  const filteredReviews = sortedReviews? sortedReviews.filter(review => review.review && review.review.trim() !== '') : '';

  const handleRatingChange = (event) => {
    setReviewDetails({
      ...ReviewDetails,
      "rating": event.target.value,
      "reviewID": uid(16),
    })
  };

  const handleReviewChange = (event) => {
    setReviewDetails({
      ...ReviewDetails,
      "review": event.target.value,
      "reviewID": uid(16),
    })
  };

  const handleSubmit = async () => {
    const response = await axiosapi.put(`/groups/addReview/${id.id}`, {
      "reviewID": ReviewDetails.reviewID,
      "username": ReviewDetails.username,
      "review": ReviewDetails.review,
      "timestamp": formatISO9075(new Date()),
      "rating": ReviewDetails.rating,
    }, {
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    fetchData();

    setReviewDetails({
      reviewID: '',
      username: localStorage.getItem('name'),
      rating: 0,
      review: '',
      timestamp: '',
    })

    document.querySelectorAll('input[name="rating"]').forEach(input => {
      input.checked = false;
    });
  }

  const fetchData = async () => {
    try {
      const response = await axiosapi.get(`/groups/getReviews/${id.id}`, {
        crossDomain: true,
        headers: {
          'Content-Type': 'application/json',
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          "MyDate": formatISO(new Date(), { representation: 'date' })
        }
      })
      if (!response.status === 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.data;
      setReviewHistory(data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  const colors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
  ];

  const getAvatarColor = (messageSender) => {
    let hash = 0;
    for (let i = 0; i < messageSender.length; i++) {
      hash = 31 * hash + messageSender.charCodeAt(i);
    }
    const index = Math.abs(hash % colors.length);
    return colors[index];
  };

  const formatTimestamp = (timestamp) => {
    const difference = differenceInMinutes(new Date(), new Date(timestamp));
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };


  return (
    <div>
      <div className="reviewheading">
        <span>Group Members Review</span>
        <p>What our members say about this group</p>
      </div>
      <Reviews reviews={filteredReviews} />
      {isMember &&
        <div className="writeReviewContainer">
          <button onClick={openReviewModal}>Write a review!</button>
          {isModalOpen &&
            <div className="modal-container" onClick={closeReviewModal}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <IoClose className="close-modal" onClick={closeReviewModal} />
                <h3>Share Your Feedback: Review Our Community Group</h3>
                <div className="rating">
                  <input value="5" name="rating" id="star5" type="radio" onChange={handleRatingChange} />
                  <label for="star5"></label>
                  <input value="4" name="rating" id="star4" type="radio" onChange={handleRatingChange} />
                  <label for="star4"></label>
                  <input value="3" name="rating" id="star3" type="radio" onChange={handleRatingChange} />
                  <label for="star3"></label>
                  <input value="2" name="rating" id="star2" type="radio" onChange={handleRatingChange} />
                  <label for="star2"></label>
                  <input value="1" name="rating" id="star1" type="radio" onChange={handleRatingChange} />
                  <label for="star1"></label>
                </div>
                <div className="reviewbox">
                  <textarea
                    value={ReviewDetails.review}
                    onChange={handleReviewChange}
                    placeholder='Share your experience with the group. What did you like? What could be improved? Your comments are valuable for other members and the group admins.'
                  />
                </div>
                <div className="reviewsubmit">
                  <button onClick={handleSubmit}>Submit</button>
                </div>

              </div>
            </div>
          }
        </div>
      }

    </div>
  )
}

export default GroupReviews
