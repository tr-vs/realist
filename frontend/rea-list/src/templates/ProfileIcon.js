import '../styles/ProfileIcon.css';
import { Link } from 'react-router-dom';

const ProfileIcon = ({ pfp, onClick }) => {
    const imagesrc =
        pfp !== undefined
            ? pfp
            : 'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg';

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
