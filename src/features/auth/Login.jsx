import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import usePersist from '../../hooks/usePersist'
import PulseLoader from 'react-spinners/PulseLoader'
import HeaderClient from '../../ClientComponent/Dashboard/HeaderClient'
import Footer from '../../ClientComponent/Dashboard/Footer'

const Login = () => {
    const userRef = useRef()
    const errRef = useRef()
    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false) // Nouvel état pour afficher/masquer le mot de passe
    const [validPassword, setValidPassword] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [persist, setPersist] = usePersist()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const PWD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!#$%])[A-Za-z\d@!#$%]{8,}$/

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [email, password])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email))
    }, [email])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    const handleSubmit = async (e) => {
        e.preventDefault()
        // Vérifiez si tous les champs sont valides avant de soumettre le formulaire
        if (validEmail && validPassword) {
            try {
                const { accessToken } = await login({ email, password }).unwrap()
                dispatch(setCredentials({ accessToken }))
                setEmail('')
                setPassword('')
                navigate('/dash')
            } catch (err) {
                if (!err.status) {
                    setErrMsg('No Server Response')
                } else if (err.status === 400) {
                    setErrMsg('Missing Email or Password')
                } else if (err.status === 404) {
                    setErrMsg('User not found')
                } else if (err.status === 401) {
                    setErrMsg('Wrong password')
                }else if (err.status === 403) {
                    setErrMsg('This account has been deactivated by the adminstrator')
                }else if (err.status === 402) {
                    setErrMsg('This account must be activated')
                }
                 else {
                    setErrMsg(err.data?.message)
                }
                errRef.current.focus()
            }
        }
    }

    const handleUserInput = (e) => setEmail(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)
    const handleToggle = () => setPersist(prev => !prev)
    const toggleShowPassword = () => setShowPassword(prev => !prev) // Fonction pour basculer l'affichage du mot de passe

    const errClass = errMsg ? "errmsg" : "offscreen"

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
                                    <br /><br />
                                    <br /><br />
                                    <br /><br />
                                    <p  ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>

                                    <form id="contact" onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <h2>Login</h2>
                                            </div>
                                            <fieldset>
                                                <label htmlFor="email">Email:</label>
                                                <input
                                                    className={`form-control ${!validEmail && email.length > 0 ? 'is-invalid' : ''}`}
                                                    type="email"
                                                    id="email"
                                                    ref={userRef}
                                                    value={email}
                                                    onChange={handleUserInput}
                                                    autoComplete="on"
                                                    required
                                                    aria-invalid={!validEmail && email.length > 0 ? 'true' : 'false'}
                                                />
                                                {!validEmail && email.length > 0 && (
                                                    <div className="invalid-feedback">Please enter a valid email address.</div>
                                                )}
                                            </fieldset>
                                            <fieldset>
                                                <label htmlFor="password">Password:</label>
                                                <div className="password-input-group">
                                                    <input
                                                        className={`form-control ${!validPassword && password.length > 0 ? 'is-invalid' : ''}`}
                                                        type={showPassword ? 'text' : 'password'} // Afficher le mot de passe en texte clair ou masqué
                                                        id="password"
                                                        onChange={handlePwdInput}
                                                        value={password}
                                                        required
                                                        aria-invalid={!validPassword && password.length > 0 ? 'true' : 'false'}
                                                    />
                                                    <button type="button" className="password-toggle-btn" onClick={toggleShowPassword}>
                                                        {showPassword ? 'Hide' : 'Show'}
                                                    </button>
                                                    {!validPassword && password.length > 0 && (
                                                    <div className="invalid-feedback">
                                                        Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.
                                                    </div>
                                                )}
                                                </div>
                                                
                                            </fieldset>
                                            <fieldset>
                                                <label htmlFor="persist" className="form__persist">
                                                    Trust This Device
                                                    <input
                                                        type="checkbox"
                                                        className="form__checkbox"
                                                        id="persist"
                                                        onChange={handleToggle}
                                                        checked={persist}
                                                    />
                                                </label>
                                                <div className="forgot-password-link">
        <Link to="/forgot-password">Forgot Password?</Link>
    </div>
                                            </fieldset>
                                            <button className="form__submit-button" disabled={!validEmail || !validPassword}>
                                                LogIn
                                            </button>
                                        </div>
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
export default Login