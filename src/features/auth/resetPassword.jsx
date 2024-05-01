import React, { useEffect, useState } from 'react';
import HeaderClient from '../../ClientComponent/Dashboard/HeaderClient';
import queryString from 'query-string';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from '../../ClientComponent/Dashboard/Footer';

const PWD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!#$%])[A-Za-z\d@!#$%?]{8,}$/;
const baseUrl = 'http://localhost:3500/auth';

function forgetPassword() {
  const location = useLocation();
  //const history= useHistory()
  const [invalidUser, setInvalidUser] = useState('');
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [newPassword, setNewPassword] = useState({
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();
  const { token, id } = queryString.parse(location.search);

  const verifyToken = async () => {
    try {
      const { data } = await axios(`${baseUrl}/verify-token?token=${token}&id=${id}`);
      setBusy(false);
      console.log(data.success);
    } catch (err) {
      if (err?.response?.data) {
        const { data } = err.response;
        console.log(data.success);
        if (!data.success) return setInvalidUser(data.err);
        return console.log(err.response.data);
      }
      console.log(err);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setNewPassword({ ...newPassword, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = newPassword;
    // Check empty fields
    if (!PWD_REGEX.test(password)) {
      return setError('At least one character, one number, one special character, and minimum length of 8 characters are required!');
    }
    if (password !== confirmPassword) {
      return setError('Password does not match!');
    }

    try {
      setBusy(true);
      const { data } = await axios.post(`${baseUrl}/reset-password?token=${token}&id=${id}`, { password });
      setBusy(false);
      console.log(data.success);
      if (data.success) {
        setSuccess(true);
        navigate('/login');
      }
    } catch (error) {
      setBusy(false);
      if (error?.response?.data) {
        const { data } = error.response;
        console.log(data.success);
        if (!data.success) return setError(data.error);
        return console.log(error.response.data);
      }
      console.log(error);
    }
  };

  const errClass = error ? 'error' : 'offscreen';

  if (success)
    return (
      <>
        <div>
          <h1>Password Reset Success</h1>
        </div>
      </>
    );
  if (!(invalidUser == ''))
    return (
      <>
        <div>
          <h1>{invalidUser}Reset token Not valid</h1>
        </div>
      </>
    );
  if (busy)
    return (
      <>
        <div>
          <h1>Wait for a moment verifying reset token</h1>
        </div>
      </>
    );

  return (
    <>
      <HeaderClient />
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Reset Password</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item" />
          <li className="breadcrumb-item" />
          <li className="breadcrumb-item active text-white" />
        </ol>
      </div>

      <section className="contact-us" id="contact">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 align-self-center">
              <div className="row">
                <div className="col-lg-12">
                  <p className={errClass} aria-live="assertive">
                    {error}
                  </p>

                  <form id="contact" onSubmit={handleSubmit}>
                    <div className="row g-5">
                      <div className="col-md-12 col-lg-6 col-xl-7">
                        <label htmlFor="password">Password:</label>
                        <input
                          className="form-control"
                          type="password"
                          id="password"
                          name="password"
                          placeholder="*********"
                          onChange={handleOnChange}
                          pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!#$%])[A-Za-z\d@!#$%?]{8,}$"
                          title="At least one character, one number, one special character, and minimum length of 8 characters are required!"
                          required
                        />

                        <label htmlFor="confirmPassword">Confirm password:</label>
                        <input
                          className="form-control"
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          placeholder="*********"
                          onChange={handleOnChange}
                          pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!#$%])[A-Za-z\d@!#$%?]{8,}$"
                          title="At least one character, one number, one special character, and minimum length of 8 characters are required!"
                          required
                        />
                      </div>
                    </div>
                    <button className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary" style={{ marginTop: '20px' }}>
                      Reset Password
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="upcoming-meetings" id="meetings">
        <Footer />
      </section>
    </>
  );
}

export default forgetPassword;