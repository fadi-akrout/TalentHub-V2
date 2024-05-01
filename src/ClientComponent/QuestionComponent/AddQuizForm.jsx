import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../HomePage/Header';
import Footer from '../Dashboard/Footer';
import './quiz.css';

const AddQuizForm = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const{id}=useParams()

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:3500/questions/api/questions');
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleQuestionSelect = (e) => {
    const questionId = e.target.value;
    if (e.target.checked) {
      setSelectedQuestions([...selectedQuestions, questionId]);
    } else {
      setSelectedQuestions(selectedQuestions.filter((id) => id !== questionId));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const quizData = {
      title,
      questions: selectedQuestions,
    };

    try {
      const response = await axios.post(`http://localhost:3500/offers/quiz/${id}`, quizData);
      console.log('Quiz added successfully:', response.data);
      toast.success('Quiz added successfully!');
      // Reset form fields or perform any additional actions
    } catch (error) {
      console.error('Error adding quiz:', error);
      toast.error('Question cannot be empty');
    }
  };

  return (
    <>
    <Header />
    <div className="container-fluid page-header py-5">
      <h1 className="text-center text-white display-6">Add Quiz</h1>
      <ol className="breadcrumb justify-content-center mb-0">
        <li className="breadcrumb-item" />
        <li className="breadcrumb-item" />
        <li className="breadcrumb-item active text-white"></li>
      </ol>
    </div>
    <div className="container-fluid py-5">
        <div className="container py-5 border border-secondary rounded p-4">
          <div className="row">
            <div className="col-md-8 col-lg-8">
    <form onSubmit={handleSubmit}>
    <div className="row g-5">
                  <div className="col-md-12 col-lg-6 col-xl-7">

      <div className="row">
      <div className="col-md-12 col-lg-12">
                        <div className="form-item w-100">
        <label className="form-label my-3">Title</label>
        <input
         className="form-control"
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      </div>
      </div>


      <div className="row">
      <div className="col-md-12 col-lg-12">
                        <div className="form-item w-100">
        <label>Questions</label>
        {questions.map((question) => (
          <div key={question._id}>
            <label className="form-label my-3">
              <input
              
                type="checkbox"
                value={question._id}
                checked={selectedQuestions.includes(question._id)}
                onChange={handleQuestionSelect}
              />
              {question.questionText}
            </label>
          </div>
        ))}
      </div>
      </div>
      </div>
      <button className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary buttonquiz" type="submit">Add Quiz</button>
      </div>
    </div>
    </form>
    </div>
    </div>
    </div>
    </div>
    <Footer />
      <ToastContainer />
    </>
  );
};

export default AddQuizForm;