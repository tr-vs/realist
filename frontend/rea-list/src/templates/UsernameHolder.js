import ProfileIcon from "./ProfileIcon"
import '../styles/UsernameHolder.css';
import { Link } from "react-router-dom";

const UsernameHolder = ({pfp, username})=> {
    const imagesrc =
        pfp !== undefined
            ? pfp
            : 'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg';

    const usernameSrc = 
        username !== undefined  
            ? username
            : "kesdlvi"

    const handleClick = () => {
        window.location.reload();
    }

    return (
        <Link to={ `/${usernameSrc}` }>
            <div className="username-pfp-container">
                <img 
                    className="search-menu-pfp"
                    src={imagesrc}
                    alt="profile-photo" 
                />
                <h3 className='username-input'>{usernameSrc}</h3>
                
            </div>
        </Link>
    )
}

export default UsernameHolder