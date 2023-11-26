import '../styles/SecondProfileIcon.css';
import { Link } from 'react-router-dom';

const SecondProfileIcon = ({onClick, profile}) => {
    return (
        <Link to={'/profile'}>
            <img onClick={onClick} className='second-profile-icon-image'src={profile} alt="" /> 
        </Link>
    ); 
};
export default SecondProfileIcon;
