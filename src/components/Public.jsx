import { Link } from 'react-router-dom'

const Public = () => {
    
     const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">TalentHub!</span></h1>
            </header>
            <main className="public__main">
                <p>Located in Esprit.</p>
                <address className="public__addr">
                    TalentHub<br />
                    Esprit<br />
                    Ghazela<br />
                    <a href="tel:+15555555555">(555) 555-5555</a>
                </address>
                <br />
                <p>Owner: Pheonix</p>
            </main>
            <footer>
                <Link to="/login"> Login</Link>
                <br></br>
                <Link to="/signup"> Sign up</Link>
            </footer>
        </section>

    )
    return content 
}
export default Public