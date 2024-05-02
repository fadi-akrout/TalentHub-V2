import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';

const ResultScore = ({ offerId }) => {
  const [scores, setScores] = useState([]);
  const { userId } = useAuth();
  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await fetch(`http://localhost:3500/Result/quiz-results?userId=${userId}&offerId=${offerId}`);
        const data = await response.json();

        if (response.ok) {
          setScores(data);
        } else {
          // Handle error response
          console.error('Failed to fetch scores:', data.message);
        }
      } catch (error) {
        // Handle network or server error
        console.error('Failed to fetch scores:', error);
      }
    };

    fetchScores();
  }, [offerId]);

  return (
    <div>
      <h6>Quiz Results</h6>
      {scores.length > 0 ? (
        <ul>
          {scores.map((result, index) => (
            <li key={index}>Score: {result.score}</li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default ResultScore;