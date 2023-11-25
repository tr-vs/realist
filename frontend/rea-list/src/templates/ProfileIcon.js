import '../styles/ProfileIcon.css';
import { Link } from 'react-router-dom';

const ProfileIcon = ({ pfp, onClick }) => {
    const imagesrc =
        pfp !== undefined
            ? pfp
            : 'https://static.vecteezy.com/system/resources/thumbnails/019/879/186/small/user-icon-on-transparent-background-free-png.png';

    return (
        <img
            onClick={onClick}
            className="profile-icon-image"
            src={imagesrc}
            alt=""
        />
    );
};
export default ProfileIcon;
