import '../styles/SecondProfileIcon.css';
import { Link } from 'react-router-dom';

const SecondProfileIcon = ({onClick}) => {
    return (
        <Link to={'/profile'}>
            <img onClick={onClick} className='second-profile-icon-image'src="https://static.vecteezy.com/system/resources/thumbnails/019/879/186/small/user-icon-on-transparent-background-free-png.png" alt="" /> 
        </Link>
    ); 
};
export default SecondProfileIcon;
