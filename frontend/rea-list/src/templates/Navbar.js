import '../styles/NavbarStyles.css'
import SearchIcon from '@mui/icons-material/Search';
import MenuBar from '../svg/MenuBar';
import CancelButton from '../svg/CancelButton';
import Magnify from '../svg/Magnify';
import { useState, useRef } from 'react';

const Navbar = ({ isCommunityClicked, isFriendsClicked, setIsCommunityClicked, setIsFriendsClicked }) => {

    const [searchBar, setSearchBar] = useState(false);
    const [rotationAngle, setRotationAngle] = useState(0);
    const inputRef = useRef(null);

    const handleSearchClick = () => {
        if (!searchBar) {
            setRotationAngle(rotationAngle + 90);
            setTimeout(() => {
                setSearchBar(true);
            }, 200);
            
        }
        if (searchBar && inputRef.current) {
            inputRef.current.focus();
        }
    }

    const closeSearchClick = () => {
        if (searchBar) {
            setRotationAngle(rotationAngle - 90); 
            setTimeout(() => {
                setSearchBar(false);
            }, 200);
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

                <Magnify className='search-image' onClick={handleSearchClick}/>
                
                {searchBar && (
                    <input ref = {inputRef} className='search-bar' type="text" name="" id="" placeholder='Search...' />
                )}

                <div className='side-bar-button' >
                    
                    {!searchBar && (
                        <MenuBar rotationAngle={rotationAngle}/>
                    )}
                    
                    {searchBar && (
                        <CancelButton onClick={closeSearchClick} rotationAngle={rotationAngle}/>
                    )}
                    

                </div>
            </div>
        </div>
    );
}

export default Navbar;
