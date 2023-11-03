
import '../styles/NavbarStyles.css'
import { useState } from 'react';

const Navbar = ( {isCommunityClicked, isFriendsClicked, setIsCommunityClicked, setIsFriendsClicked}) => {
    const handleCommunityButtonClick = () => {
        if (isFriendsClicked) {
            setIsCommunityClicked(!isCommunityClicked);
            setIsFriendsClicked(!isFriendsClicked)
        }
    };
    const handleFriendButtonClick = () => {
        if (isCommunityClicked) {
            setIsCommunityClicked(!isCommunityClicked);
            setIsFriendsClicked(!isFriendsClicked)
        }
    };

    return(
        <div className="navbar">
            {/* <div className='logo-name'>ReaList</div> */}
            <button 
            className={`community-button ${isFriendsClicked ? 'clicked' : ''}`}
            onClick={handleFriendButtonClick}
            >Friends</button>

            <button 
            className={`community-button ${isCommunityClicked ? 'clicked' : ''}`}
            onClick={handleCommunityButtonClick} 
            >Community</button>

        </div>
        

    );
}

export default Navbar 