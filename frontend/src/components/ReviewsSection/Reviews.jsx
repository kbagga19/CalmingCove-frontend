import React, { useState, useEffect } from 'react';
import './Reviews.css';
import { differenceInMinutes, formatDistanceToNow } from 'date-fns';
import Star from './Star';

const Reviews = ({ reviews }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [reviewsPerPage] = useState(2);

    // Calculate total number of pages
    const totalPages = Math.ceil(reviews.length / reviewsPerPage);

    // Pagination logic
    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Get current reviews
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = reviews ? reviews.slice(indexOfFirstReview, indexOfLastReview) : '';

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
        <div className="reviews-container">
            {currentReviews.length === 0 &&
                <div className='noreviews'>Be the first one to review!</div>
            }
            <div className="reviews-grid">
                {currentReviews.length !== 0 && currentReviews.map((review, index) => (
                    <div key={index} className="review-card">
                        <div className="reviewCardHeader">
                            <div className="postimg">
                                <i style={{ backgroundColor: getAvatarColor(review.username) }}>{review.username[0]}</i>
                            </div>
                            <div className="headercontent">
                                <div className="username">{review.username}</div>
                                <div className="date-time">{formatTimestamp(review.timestamp)}</div>
                            </div>
                        </div>

                        <div className="review-details">
                            <Star rating={review.rating} size="40px" />
                            <div className="statement">{review.review}</div>
                        </div>
                    </div>
                ))}
            </div>
            {totalPages > 1 && (
                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <span
                            key={i}
                            className={`page ${currentPage === i + 1 ? 'active' : ''}`}
                            onClick={() => handleClick(i + 1)}
                        ></span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Reviews;

