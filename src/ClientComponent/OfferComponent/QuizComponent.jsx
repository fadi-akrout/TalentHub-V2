import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../HomePage/Header';
import Footer from '../Dashboard/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../../hooks/useAuth';

function QuizComponent() {
    const { id } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [quizDeja, setQuizDeja] = useState(false);
    const [noQuiz, setNoQuiz] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { userId } = useAuth();

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get(`http://localhost:3500/offers/quiz/${id}`,{
                    headers:{'user-id' :userId}
                });
                setQuiz(response.data);
                setLoading(false);
            } catch (error) {
                switch (error.response.status) {
                    case 400:
                        toast.error('You have already taken the quiz for this offer');
                        setQuizDeja(true);
                        break;
                      case 401:
                        toast.error('No quiz associated with this offer');
                        setNoQuiz(true);
                        break;
                      case 404:
                        toast.error('Offer not found');
                        break;
                      case 500:
                        toast.error('server error');
                        break;
                      default:
                        toast.error('An error occurred');
                        break;
                }



                console.error('Failed to fetch quiz:', error);
                setLoading(false);
            }
        };
        fetchQuiz();
    }, [id]);

    const handleOptionChange = (index) => {
        setSelectedOption(index);
    };
    const handleCompletion = async () => {
        // Calculate the final score immediately before sending it
        const finalScore = score + (quiz.questions[currentQuestionIndex].correctOption === selectedOption ? 1 : 0);

        try {
            await axios.post('http://localhost:3500/Result/quiz-results', {
                userId: userId,  // Assuming you get userId from context or props
                quizId: id,      // The ID of the quiz
                offerId: id, // Assuming offerId is passed correctly
                score: finalScore  // Send the final score
            });
            setCompleted(true);
        } catch (error) {
            console.error('Failed to submit quiz results:', error);
        }
    }

    const handleSubmit = () => {
        if (selectedOption === null) {
            toast.error('Please select an option.');
            return;
        }

        if (quiz.questions[currentQuestionIndex].correctOption === selectedOption) {
            setScore(prevScore => prevScore + 1);
        }

        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < quiz.questions.length) {
            setCurrentQuestionIndex(nextQuestionIndex);
            setSelectedOption(null);
        } else {
            handleCompletion();
            navigate('/dash', { state: { score, total: quiz.questions.length } });
        }
    };

    if (loading) {
        return <p>Loading quiz...</p>;
    }

    if (quizDeja) {
        return (
            <>
            <Header />
            <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Quiz</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item" />
          <li className="breadcrumb-item" />
          <li className="breadcrumb-item active text-white"></li>
        </ol>
      </div>
            <div className="container-fluid py-5">
                <div className="container border border-secondary rounded p-4 bg-light">
            <p style={{color: 'red'}}>You have already taken the quiz for this offer.</p>
            </div>
            </div>
            <Footer />
            <ToastContainer />
        </>
        );
    }
    if (noQuiz) {
        return (
            <>
            <Header />
            <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Quiz</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item" />
          <li className="breadcrumb-item" />
          <li className="breadcrumb-item active text-white"></li>
        </ol>
      </div>
            <div className="container-fluid py-5">
                <div className="container border border-secondary rounded p-4 bg-light">
            <p style={{color: 'red'}}>No Quiz associated with this offer.</p>
            </div>
            </div>
            <Footer />
            <ToastContainer />
        </>
        );
    }
    if (!quiz) {
        return (
            <>
            <Header />
            <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Quiz</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item" />
          <li className="breadcrumb-item" />
          <li className="breadcrumb-item active text-white"></li>
        </ol>
      </div>
            <div className="container-fluid py-5">
                <div className="container border border-secondary rounded p-4 bg-light">
            <p>No quiz available for this offer.</p>
            </div>
            </div>
            <Footer />
            <ToastContainer />
        </>
        );
    }

    const question = quiz.questions[currentQuestionIndex];

    return (
        <>
            <Header />
            <div className="container-fluid py-5">
                <div className="container border border-secondary rounded p-4 bg-light">
                    <div className="row">
                        <div className="col-lg-8 mx-auto">
                            <h1 className="text-center mb-4">{quiz.title}</h1>
                            <h2>Question {currentQuestionIndex + 1} of {quiz.questions.length}</h2>
                            <p>{question.questionText}</p>
                            <form>
                                {question.options.map((option, index) => (
                                    <div key={index} className="form-check my-3">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="option"
                                            id={`option${index}`}
                                            checked={selectedOption === index}
                                            onChange={() => handleOptionChange(index)}
                                        />
                                        <label className="form-check-label" htmlFor={`option${index}`}>
                                            {option}
                                        </label>
                                    </div>
                                ))}
                                <button className="btn btn-primary mt-4" onClick={handleSubmit} type="button">Next</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <ToastContainer />
        </>
    );
}

export default QuizComponent;
