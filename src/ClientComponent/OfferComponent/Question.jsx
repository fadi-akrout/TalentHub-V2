import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Using react-router-dom v6 for navigation
//import './Quizz.css'
import Header from '../HomePage/Header';
//import Footer from '../Dashboard/Footer';
function QuestionComponent() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // For navigation after the quiz is completed



    const handleQuizCompletion = async () => {
        alert(`Quiz completed. Your final score is ${score}`);
        navigate('/dash'); // Navigate to the game over page
    };

    const handleOptionChange = (index) => {
        setSelectedOption(index);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedOption === null) return;

        const question = questions[currentQuestionIndex];
        const isCorrect = selectedOption === question.correctOption;
        if (isCorrect) {
            setScore(score + 1);
        }

        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < questions.length) {
            setCurrentQuestionIndex(nextQuestionIndex);
            setSelectedOption(null); // Reset for next question
        } else {
            handleQuizCompletion();
        }
    };

    if (loading) {
        return <p>Loading questions...</p>;
    }

    if (questions.length === 0) {
        return <p>No questions available.</p>;
    }

    const question = questions[currentQuestionIndex];
    const questionNumber = currentQuestionIndex + 1;
    const totalQuestions = questions.length;
    const { quizId } = useParams(); // Utilisez quizId à partir de l'URL

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`http://localhost:3500/quizzes/${quizId}/questions`);
                setQuestions(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching questions:', error);
                setLoading(false);
            }
        };

        if (quizId) {
            fetchQuestions();
        }
    }, [quizId]);

    return (
        <>
            <Header />
            <section className={`section-${questionNumber}`} id={`section-${questionNumber}`}>
                <main>
                    <div className="text-container">
                        <h4>Quiz</h4>
                        <p>QUESTION {questionNumber} OF {totalQuestions}</p>
                        <h3>{question.questionText}</h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="quiz-options">
                            {question.options.map((option, index) => (
                                <React.Fragment key={index}>
                                    <input type="radio" className={`input-radio ${questionNumber}-${index}`} id={`option-${questionNumber}-${index}`} name={`answer-${questionNumber}`}  onChange={() => handleOptionChange(index)} checked={selectedOption === index} required />
                                    <label className={`radio-label`} htmlFor={`option-${questionNumber}-${index}`} >
                                        <span className="alphabet">{String.fromCharCode(65 + index)}</span> {option}
                                        {/* Consider including icons only if needed */}
                                    </label>
                                </React.Fragment>
                            ))}
                        </div>
                        <button type="submit" className="next-button">Next</button>
                    </form>
                </main>
            </section>

        </>
    );
}

export default QuestionComponent;
