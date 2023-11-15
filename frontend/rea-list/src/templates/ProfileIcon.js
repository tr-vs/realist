import '../styles/ProfileIcon.css';
import { Link } from 'react-router-dom';

const ProfileIcon = ({onClick}) => {
    return (
        
        <img onClick={onClick} className='profile-icon-image'src="https://static.vecteezy.com/system/resources/thumbnails/019/879/186/small/user-icon-on-transparent-background-free-png.png" alt="" /> 
        
        
    ); 
};
export default ProfileIcon;
