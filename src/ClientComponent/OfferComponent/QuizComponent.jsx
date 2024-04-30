import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function QuizComponent() {
    const { id } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get(`http://localhost:3500/offers/quiz/${id}`);
                setQuiz(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch quiz:', error);
                setLoading(false);
            }
        };
        fetchQuiz();
    }, [id]);

    const handleOptionChange = (index) => {
        setSelectedOption(index);
    };

    const handleSubmit = () => {
        if (selectedOption === null) {
            alert('Please select an option.');
            return;
        }

        if (quiz.questions[currentQuestionIndex].correctOption === selectedOption) {
            setScore(score + 1);
        }

        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < quiz.questions.length) {
            setCurrentQuestionIndex(nextQuestionIndex);
            setSelectedOption(null); // Reset for the next question
        } else {
            setCompleted(true);
        }
    };

    if (loading) {
        return <p>Loading quiz...</p>;
    }

    if (!quiz) {
        return <p>No quiz available for this offer.</p>;
    }

    if (completed) {
        return (
            <div>
                <h1>Quiz Completed</h1>
                <p>Your score: {score} out of {quiz.questions.length}</p>
                <button onClick={() => navigate('/some/path')}>Go somewhere</button>
            </div>
        );
    }

    const question = quiz.questions[currentQuestionIndex];

    return (
        <div>
            <h1>{quiz.title}</h1>
            <div>
                <h2>Question {currentQuestionIndex + 1}</h2>
                <p>{question.questionText}</p>
                <ul>
                    {question.options.map((option, index) => (
                        <li key={index}>
                            <label>
                                <input type="radio" value={index} checked={selectedOption === index} onChange={() => handleOptionChange(index)} />
                                {option}
                            </label>
                        </li>
                    ))}
                </ul>
                <button onClick={handleSubmit}>Next</button>
            </div>
        </div>
    );
}

export default QuizComponent;
