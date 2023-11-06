
import '../styles/NavbarStyles.css'
import SearchIcon from '@mui/icons-material/Search';
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
    const handleSearchFocus = (event) => {
        // Clear the placeholder when the input is focused
        event.target.placeholder = '';
      };
    const handleSearchBlur = (event) => {
    // Restore the placeholder when the input is blurred
    event.target.placeholder = '🔍 Search...';
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

            <input
                className='search-bar'
                type='text'
                placeholder='&#128269;  Search...'
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
            />

        </div>
        

    );
}

export default Navbar 