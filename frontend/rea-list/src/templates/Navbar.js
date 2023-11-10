import '../styles/NavbarStyles.css'
import SearchIcon from '@mui/icons-material/Search';
import { useState, useRef } from 'react';

const Navbar = ({ isCommunityClicked, isFriendsClicked, setIsCommunityClicked, setIsFriendsClicked }) => {

    const [searchBar, setSearchBar] = useState(false);
    const [rotationAngle, setRotationAngle] = useState(0);
    const inputRef = useRef(null);

    const handleSearchClick = () => {
        if (!searchBar) {
            setSearchBar(true);
            setRotationAngle(rotationAngle + 90); 
            
        }
        if (searchBar && inputRef.current) {
            console.log("errros")
            inputRef.current.focus();
        }
    }
    const closeSearchClick = () => {
        if (searchBar) {
            setSearchBar(false);
            setRotationAngle(rotationAngle - 90); 
        }
    }

    const handleCommunityButtonClick = () => {
        if (isFriendsClicked) {
            setIsCommunityClicked(!isCommunityClicked);
            setIsFriendsClicked(!isFriendsClicked);
        }
    };

    const handleFriendButtonClick = () => {
        if (isCommunityClicked) {
            setIsCommunityClicked(!isCommunityClicked);
            setIsFriendsClicked(!isFriendsClicked);
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

    return (
        <div className="navbar">
            <h1 className='logo-name'>ReaList</h1>

            <div className='two-buttons'>
                <button
                    className={`community-button ${isFriendsClicked ? 'clicked' : ''}`}
                    onClick={handleFriendButtonClick}
                >Friends</button>

                <button
                    className={`community-button ${isCommunityClicked ? 'clicked' : ''}`}
                    onClick={handleCommunityButtonClick}
                >Community</button>
            </div>

            <div className='right-side'>
                <div className='search-image' onClick={handleSearchClick}>🔍</div>

                {searchBar && (
                    <input ref = {inputRef} className='search-bar' type="text" name="" id="" placeholder='Search...' />
                )}

                <div className='side-bar-button' >
                    <svg
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={closeSearchClick}
                        style={{ transition: 'transform 0.3s ease', transform: `rotate(${rotationAngle}deg)` }}
                    >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <g id="Menu / Menu_Duo_LG">
                                <path id="Vector" d="M3 15H21M3 9H21" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </g>
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
