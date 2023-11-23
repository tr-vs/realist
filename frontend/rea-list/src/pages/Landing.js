import '../styles/LandingPage.css';
import { Link } from 'react-scroll';

const Landing = () => {

    return (
        <>
            <div className='landing-container'>
                <div>
                    <div className='site-name'>
                        <h1>ReaList</h1>
                    </div>
                </div>
                <Link to='info-section' smooth={true} duration={1000} className='arrow'></Link>
            </div>
            <div id='info-section'>
                    <div className='info-container'>
                        <h1>a way to share your music </h1>
                    </div>
            </div>
        </>
        
        
    )
}
export default Landing