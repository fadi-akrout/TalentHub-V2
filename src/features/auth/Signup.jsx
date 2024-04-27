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
const PWD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!#$%])[A-Za-z\d@!#$%]{8,}$/
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
            const { accessToken,userId } = await signup({
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
          <section className="contact-us" id="contact">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 align-self-center">
                  <div className="row">
                    <div className="col-lg-12">
                      <p style={{ color: 'green' }} ref={usernameRef} className={errClass} aria-live="assertive">{errMsg}</p>
                      <form id="contact" onSubmit={handleSubmit}>
                        <div className="col-lg-12">
                          <h2>Sign Up</h2>
                        </div>
                        <label htmlFor="username">Username:</label>
                        <input
                          className={`form__input ${validUserClass}`}
                          type="text"
                          id="username"
                          ref={usernameRef}
                          value={username}
                          onChange={handleUsernameInput}
                          autoComplete="off"
                          required
                          aria-invalid={!validUsername && username.length > 0 ? 'true' : 'false'}
                        />
                        {!validUsername && username.length > 0 && <p className="form__input--error">Username must be between 3 and 20 characters and contain only letters.</p>}
      
                        <label htmlFor="email">Email:</label>
                        <input
                          className={`form__input ${validEmailClass}`}
                          type="email"
                          id="email"
                          ref={emailRef}
                          value={email}
                          onChange={handleEmailInput}
                          autoComplete="on"
                          required
                          aria-invalid={!validEmail && email.length > 0 ? 'true' : 'false'}
                        />
                        {!validEmail && email.length > 0 && <p className="form__input--error">Please enter a valid email address.</p>}
      
                        <label htmlFor="password">Password:</label>
                        <input
                          className={`form__input ${validPwdClass}`}
                          type="password"
                          id="password"
                          ref={passwordRef}
                          value={password}
                          onChange={handlePasswordInput}
                          required
                          aria-invalid={!validPassword && password.length > 0 ? 'true' : 'false'}
                        />
                        {!validPassword && password.length > 0 && <p className="form__input--error">Password must be at least 8 characters and contain at least one letter, one number, and one special character.</p>}
      
                        <fieldset>
                          <label htmlFor="JobType" className="form-label">Role:</label>
                          <select id="roles" name="roles" className={`form-control ${validRolesClass}`} value={roles} onChange={onRolesChanged}>
                            {options}
                          </select>
                        </fieldset>
                        {roles.length === 0 && <p className="form__input--error">Please select at least one role.</p>}
      
                        <button className="form__submit-button">Sign Up</button>
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
      )

    return content
}

export default Signup