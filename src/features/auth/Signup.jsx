import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useSignupMutation } from './authApiSlice'
import usePersist from '../../hooks/usePersist'
import { ROLES } from "../../config/roles"
import PulseLoader from 'react-spinners/PulseLoader'
import HeaderClient from '../../ClientComponent/Dashboard/HeaderClient'
import Footer from '../../ClientComponent/Dashboard/Footer'
const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!#$%])[A-Za-z\d@!#$%?]{8,}$/
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Signup = () => {
  const usernameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const [username, setUsername] = useState('')
  const [validUsername, setValidUsername] = useState(false)
  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(false)
  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false)
  const [roles, setRoles] = useState(["Student"])
  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username))
  }, [username])
  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email))
  }, [email])

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password))
  }, [password])

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [signup, { isLoading,
    isSuccess,
    isError,
    error }] = useSignupMutation()

  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [username, email, password, roles])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (canSave) {
      try {
        const { accessToken, userId } = await signup({
          username,
          email,
          password,
          roles: roles
        }).unwrap()
        dispatch(setCredentials({ accessToken }))
        setUsername('')
        setEmail('')
        setPassword('')
        setRoles([])
        console.log(userId);
        navigate(`/verify-email/${userId}`)
      } catch (err) {
        if (!err.status) {
          setErrMsg('No Server Response');
        } else if (err.status === 400) {
          setErrMsg('Invalid input');
        } else if (err.status === 401) {
          setErrMsg('Unauthorized');
        } else {
          setErrMsg(err.data?.message);
        }
        usernameRef.current.focus();
      }
    }
  }
  const options = Object.values(ROLES).map(role => {
    return (
      <option
        key={role}
        value={role}

      > {role}</option >
    )
  })

  const handleUsernameInput = (e) => setUsername(e.target.value)
  const handleEmailInput = (e) => setEmail(e.target.value)
  const handlePasswordInput = (e) => setPassword(e.target.value)
  const onRolesChanged = e => {
    const values = Array.from(
      e.target.selectedOptions, //HTMLCollection 
      (option) => option.value
    )
    setRoles(values)
  }

  const canSave = [roles.length, validUsername, validPassword, validEmail].every(Boolean) && !isLoading


  const errClass = errMsg ? "errmsg" : "offscreen"
  const validUserClass = !validUsername ? 'form__input--incomplete' : ''
  const validEmailClass = !validEmail ? 'form__input--incomplete' : ''
  const validPwdClass = !validPassword ? 'form__input--incomplete' : ''
  const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''


  if (isLoading) return <PulseLoader color={"#FFF"} />

  const content = (
    <>
      <HeaderClient />
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Sign Up</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item" />
          <li className="breadcrumb-item" />
          <li className="breadcrumb-item active text-white"></li>
        </ol>
      </div>


      <div className="container-fluid py-5">
      <div className="container py-5 border border-secondary rounded p-4">
  <p style={{ color: 'red' }} ref={usernameRef} className={errClass} aria-live="assertive">{errMsg}</p>
         
          <div className="row">
                <div className="col-md-8 col-lg-8">
                   <form onSubmit={handleSubmit}>
            <div className="row g-5">
              <div className="col-md-12 col-lg-6 col-xl-7">


                <div className="row">
                  <div className="col-md-12 col-lg-12">
                    <div className="form-item w-100">
                      <label className="form-label my-3">Username:</label>
                      <input
                        className={`form-control ${validUserClass}`}
                        type="text"
                        id="username"
                        ref={usernameRef}
                        value={username}
                        onChange={handleUsernameInput}
                        autoComplete="off"
                        required
                        aria-invalid={!validUsername && username.length > 0 ? 'true' : 'false'}
                      />
                      {!validUsername && username.length > 0 && <p className="form__input--error" style={{ color: 'red' }}>Username must be between 3 and 20 characters and contain only letters.</p>}
                    </div>
                  </div>

                </div>
                <div className="row">
                  <div className="col-md-12 col-lg-12">
                    <div className="form-item w-100">
                      <label className="form-label my-3">Email:</label>
                      <input
                        className={`form-control ${validEmailClass}`}

                        type="email"
                        id="email"
                        ref={emailRef}
                        value={email}
                        onChange={handleEmailInput}
                        autoComplete="on"
                        required
                        aria-invalid={!validEmail && email.length > 0 ? 'true' : 'false'}

                      />
                      {!validEmail && email.length > 0 && <p className="form__input--error" style={{ color: 'red' }}>Please enter a valid email address.</p>}
                    </div>
                  </div>

                </div>
                <div className="row">
                  <div className="col-md-12 col-lg-12">
                    <div className="form-item w-100">
                      <label className="form-label my-3">Password:</label>
                      <input
                        className={`form-control ${validPwdClass}`}

                        type="password"
                        id="password"
                        ref={passwordRef}
                        value={password}
                        onChange={handlePasswordInput}
                        required
                        aria-invalid={!validPassword && password.length > 0 ? 'true' : 'false'}

                      />
                      {!validPassword && password.length > 0 && <p className="form__input--error" style={{ color: 'red' }}>Password must be at least 8 characters and contain at least one letter, one number, and one special character.</p>}
                    </div>
                  </div>

                </div>


                <div className="row">
                  <div className="col-md-12 col-lg-12">
                    <div className="form-item w-100">
                      <fieldset>
                        <label htmlFor="JobType" className="form-label">Role:</label>
                        <select id="roles" name="roles" className={`form-control ${validRolesClass}`} value={roles} onChange={onRolesChanged}>
                          {options}
                        </select>
                      </fieldset>
                      {roles.length === 0 && <p className="form__input--error">Please select at least one role.</p>}

                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary" style={{ marginTop: '40px' }} >
              <i className=" me-2 text-primary"></i>
              Sign Up</button>
          </form>


         
        </div>
        <div className="col-md-4 col-lg-4 my-auto">
                <img src="public/img/talenthublogo.png" alt="Description de l'image" className="img-fluid" />
            </div>
      </div>
      </div>
      </div>


   
            <Footer />
         
    </>
  )

  return content
}

export default Signup