import React, { useState } from 'react';
import axios from 'axios';
import Header from '../HomePage/Header';
import Footer from '../Dashboard/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddQuestionForm = () => {
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [correctOption, setCorrectOption] = useState(0);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
    
    // If the number of options is greater than 2 and the current option is empty, remove it
    if (options.length > 2 && value === '') {
      const filteredOptions = options.filter((_, i) => i !== index);
      setOptions(filteredOptions);
    }
  };

  const handleRemoveOption = (index) => {
    const filteredOptions = options.filter((_, i) => i !== index);
    setOptions(filteredOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const questionData = {
      questionText,
      options,
      correctOption,
    };

    try {
      const response = await axios.post('http://localhost:3500/questions/api/questions', questionData);
      console.log('Question added successfully:', response.data);
      toast.success('Question added successfully!');
      // Reset form fields or perform any additional actions
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error('Question cannot be empty:', error);
        toast.error('Question cannot be empty');
      } else {
        console.error('Error adding question:', error);
        toast.error('Error adding question');
      }
    }
  };

  return (
    <>
      <Header />
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Add questions</h1>
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
                          <label className="form-label my-3">Question</label>
                          <input
                            className="form-control"
                            type="text"
                            id="questionText"
                            value={questionText}
                            onChange={(e) => setQuestionText(e.target.value)}
                          />
                        </div>
                     </div>
                    </div>
                    <div className="row">
  <div className="col-9">
    <div className="form-item w-100">
      <label className="form-label my-3">Options</label>
      {options.map((option, index) => (
        <div className="row" key={index}>
          <div className="col-11">
            <input
              className="form-control"
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
          </div>
          {options.length > 2 && (
            <div className="col-1">
              <button
                className="btn btn-secondary btn-sm"
                type="button"
                onClick={() => handleRemoveOption(index)}
              >
                -
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
    <button
      className="btn btn-secondary btn-sm"
      type="button"
      onClick={() => setOptions([...options, ''])}
    >
      +
    </button>
  </div>
</div>
                    <div className="row">
                      <div className="col-md-12 col-lg-12">
                        <div className="form-item w-100">
                          <label className="form-label my-3">Correct Option</label>
                          <select
                            className="form-select"
                            value={correctOption}
                            onChange={(e) => setCorrectOption(Number(e.target.value))}
                          >
                            {options.map((_, index) => (
                              <option key={index} value={index}>
                                Option {index + 1}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 col-lg-12">
                        <button
                          className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary"
                          style={{ marginTop: '40px' }}
                          type="submit"
                        >
                          Add Question
                        </button>
                      </div>
                    </div>
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

export default AddQuestionForm;