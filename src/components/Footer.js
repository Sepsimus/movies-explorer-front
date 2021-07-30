function Footer(){
    return(
        <footer className="footer">
            <div className="footer__wrapper_type_text">
                <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            </div>
            <div className="footer__navigation">
                <p className="footer__copyright"> &copy; {new Date().getFullYear()} Konstantin Musin</p>
                <div className="footer__wrapper_type_button">
                <button className='footer__link'>Яндекс.Практикум</button>
                <button className='footer__link'>Github</button>
                <button className='footer__link'>Facebook</button>
                </div>
            </div>
        </footer>
    )
} 

export default Footer;