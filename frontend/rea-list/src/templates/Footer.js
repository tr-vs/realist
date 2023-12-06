import '../styles/FooterStyles.css';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-container">
                <div>
                    <h1 className="footer-list-title">Support</h1>
                    <ul className="footer-list">
                        <li className="footer-list-item"> <a href = "https://docs.google.com/presentation/d/17s7EROZYcndUFGXO3eVGDJ2ufHWQGr0iAtz2lyWuZ_g/edit?usp=sharing" className="footer-list-item"> About Us</a></li>
                        <li className="footer-list-item"> <a href = "https://www.buymeacoffee.com/realistdonation" className="footer-list-item"> Donate </a></li>
                    </ul>
                </div>
                <div>
                    <h1 className="footer-list-title">Contact</h1>
                    <ul className="footer-list">
                        <li className="footer-list-item"> <a href = "https://www.ucla.edu/" className="footer-list-item"> Location </a></li>
                        <li className="footer-list-item"> <a href= "mailto:support@realist.top" className="footer-list-item"> Email </a></li>
                    </ul>
                </div>
                <div>
                    <h1 className="footer-list-title">Socials</h1>
                    <ul className="footer-list">
                        <li className="footer-list-item"> <a href = "https://github.com/tr-vs/realist" className="footer-list-item"> Our Code </a></li>
                        <li className="footer-list-item"> <a href = "https://linktr.ee/realistlinktree" className="footer-list-item"> Our GitHub </a></li>
                    </ul>
                </div>
            </div>
        </div>
        
    )
}

export default Footer