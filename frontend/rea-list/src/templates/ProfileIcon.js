import '../styles/ProfileIcon.css';
import { Link } from 'react-router-dom';

const ProfileIcon = () => {
    return (
        <Link to="/profile">
            <img className='profile-icon-image'src="https://static.vecteezy.com/system/resources/thumbnails/019/879/186/small/user-icon-on-transparent-background-free-png.png" alt="" /> 
        </Link>
        
    ); 
};
export default ProfileIcon;
