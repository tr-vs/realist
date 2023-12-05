import '../styles/FooterStyles.css';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-container">
                <div>
                    <h1 className="footer-list-title">Support</h1>
                    <ul className="footer-list">
                        <li className="footer-list-item"> <a href = "https://www.ucla.edu/" className="footer-list-item"> About </a></li>
                        <li className="footer-list-item"> <a href = "https://www.ucla.edu/" className="footer-list-item"> Donate </a></li>
                    </ul>
                </div>
                <div>
                    <h1 className="footer-list-title">Contact</h1>
                    <ul className="footer-list">
                        <li className="footer-list-item"> <a href = "https://www.ucla.edu/" className="footer-list-item"> Location </a></li>
                        <li className="footer-list-item"> <a href = "https://www.ucla.edu/" className="footer-list-item"> Email </a></li>
                        <li className="footer-list-item"> <a href = "https://www.ucla.edu/" className="footer-list-item"> Give Us Feedback </a></li>
                    </ul>
                </div>
                <div>
                    <h1 className="footer-list-title">Socials</h1>
                    <ul className="footer-list">
                        <li className="footer-list-item"> <a href = "https://github.com/tr-vs/realist" className="footer-list-item"> GitHub </a></li>
                        <li className="footer-list-item"> <a href = "https://www.ucla.edu/" className="footer-list-item"> Our LinkedIns </a></li>
                    </ul>
                </div>
            </div>
        </div>
        
    )
}

export default Footer