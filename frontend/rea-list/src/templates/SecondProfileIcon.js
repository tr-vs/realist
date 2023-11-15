import '../styles/SecondProfileIcon.css';
import { Link } from 'react-router-dom';

const SecondProfileIcon = ({onClick}) => {
    return (
        <Link to={'/profile'}>
            <img onClick={onClick} className='second-profile-icon-image'src="https://i.scdn.co/image/ab67706c0000da842a6199fd8dcd31ca3eadfd17" alt="" /> 
        </Link>
    ); 
};
export default SecondProfileIcon;
