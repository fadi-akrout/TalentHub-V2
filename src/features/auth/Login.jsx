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
                } else if (err.status === 403) {
                    setErrMsg('This account has been deactivated by the adminstrator')
                } else if (err.status === 402) {
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
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Login</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item" />
                    <li className="breadcrumb-item" />
                    <li className="breadcrumb-item active text-white"></li>
                </ol>
            </div>
            <div className="container-fluid py-5">
                <div className="container py-5">





                    <p ref={errRef} className={errClass} aria-live="assertive" style={{ color: 'red' }}>{errMsg}</p>

                    <form onSubmit={handleSubmit}>
                        <div className="row g-5">
                            <div className="col-md-12 col-lg-6 col-xl-7">

                                <div className="row">
                                    <div className="col-md-12 col-lg-6">
                                        <div className="form-item w-100">
                                            <label className="form-label my-3">Email:</label>
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
                                        </div>
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-md-12 col-lg-6">
                                        <div className="form-item w-100">
                                            <label className="form-label my-3">Password:</label>
                                            <input
                                                className={`form-control ${!validPassword && password.length > 0 ? 'is-invalid' : ''}`}
                                                type={showPassword ? 'text' : 'password'} // Afficher le mot de passe en texte clair ou masqué
                                                id="password"
                                                onChange={handlePwdInput}
                                                value={password}
                                                required
                                                aria-invalid={!validPassword && password.length > 0 ? 'true' : 'false'}
                                            />
                                            <button type="button" className="btn border border-secondary rounded-pill" onClick={toggleShowPassword} style={{ marginTop: '20px' }}>
                                                {showPassword ? 'Hide' : 'Show'}
                                            </button>
                                            {!validPassword && password.length > 0 && (
                                                <div className="invalid-feedback">
                                                    Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.
                                                </div>
                                            )}

                                        </div>
                                    </div>

                                </div>



                                <fieldset style={{ marginTop: '20px' }}>
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
                            </div>
                        </div>
                        <button className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary" style={{ marginTop: '20px' }} disabled={!validEmail || !validPassword}>
                            <i className=" me-2 text-primary"></i>
                            LogIn
                        </button>



                    </form>





                    <section className="upcoming-meetings" id="meetings">
                        <Footer />
                    </section>
                </div>
            </div>
        </>
    )

    return content
}
export default Login