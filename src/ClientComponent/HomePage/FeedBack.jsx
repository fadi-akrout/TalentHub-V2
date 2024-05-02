import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';

function Feedback({ offerId }) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [oldRating, setOldRating] = useState(null);

  useEffect(() => {
    // Fetch existing feedback for the offer ID
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`http://localhost:3500/api/feedback/${offerId}`);
        if (response.data) {
          setOldRating(response.data.rating);
        }
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchFeedback();
  }, [offerId]);

  const handleRating = async (value) => {
    if (oldRating !== null) {
      console.log('You have already given feedback for this offer.');
      return;
    }

    setRating(value);
    try {
      const response = await axios.post('http://localhost:3500/api/feedback', {
        offerId: offerId,
        rating: value
      });
      console.log('Feedback saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving feedback:', error);
    }
  };

  return (
    <div className="feedback">
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;

        return (
          <label key={index}>
            <FaStar
              className="star"
              name="rating"
              value={ratingValue}
              onClick={() => handleRating(ratingValue)}
              color={ratingValue <= (hover || rating || oldRating) ? '#ffc107' : '#e4e5e9'}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
}

export default Feedback;
