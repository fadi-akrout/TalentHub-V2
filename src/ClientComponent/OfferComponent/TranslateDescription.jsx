import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TranslateDescription = (props) => {
  const [translatedDescription, setTranslatedDescription] = useState('');
  const [showTranslation, setShowTranslation] = useState(false);
  const [lastRequestTime, setLastRequestTime] = useState(null); // Add a state for tracking the last request time
  const rateLimitPeriod = 60000; // 1 minute in milliseconds (adjust as per your API's rate limit)

  useEffect(() => {
    const translateDescription = async () => {
      const currentTime = new Date().getTime();

      // Check if enough time has elapsed since the last request
      if (
        lastRequestTime === null ||
        currentTime - lastRequestTime >= rateLimitPeriod
      ) {
        try {
          const options = {
            method: 'POST',
            url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
            params: {
              'api-version': '3.0',
              to: 'fr', // Translate to French
            },
            headers: {
              'content-type': 'application/json',
              'X-RapidAPI-Key': 'c2dde7c8c0msh72725caa602502dp16317ajsn278dc5cde150',
              'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
            },
            data: [
              {
                Text: props.description // Use the description from props
              }
            ]
          };

          const response = await axios.request(options);
          setTranslatedDescription(response.data[0].translations[0].text);
          setLastRequestTime(currentTime); // Update the last request time
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log('Rate limit reached. Waiting for the next period...');
      }
    };

    if (props.description && showTranslation) {
      translateDescription();
    }
  }, [props.description, showTranslation, lastRequestTime, rateLimitPeriod]);

  const handleTranslationToggle = () => {
    setShowTranslation(!showTranslation);
  };

  return (
    <div>
      <button className="btn border border-secondary rounded-pill px-3 text-primary" onClick={handleTranslationToggle}>
        {showTranslation ? 'Hide Translation' : 'Translate Description'}
      </button>
      {showTranslation && <p>{translatedDescription}</p>}
    </div>
  );
};

export default TranslateDescription;
