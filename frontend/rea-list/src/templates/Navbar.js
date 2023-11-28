import '../styles/NavbarStyles.css';
import SearchIcon from '@mui/icons-material/Search';
import MenuBar from '../svg/MenuBar';
import CancelButton from '../svg/CancelButton';
import Magnify from '../svg/Magnify';
import ProfileIcon from './ProfileIcon';
import { useState, useRef, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = ({
    isCommunityClicked,
    isFriendsClicked,
    setIsCommunityClicked,
    setIsFriendsClicked,
    isSidebarClicked,
    setIsSidebarClicked,
}) => {
    const [searchBar, setSearchBar] = useState(false);
    const [rotationAngle, setRotationAngle] = useState(0);
    const [pfp, setPfp] = useState(
        'https://static.vecteezy.com/system/resources/thumbnails/019/879/186/small/user-icon-on-transparent-background-free-png.png'
    );
    const inputRef = useRef(null);
    const { user } = useAuthContext();

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
    };

    const closeSearchClick = () => {
        if (searchBar) {
            setRotationAngle(rotationAngle - 90);
            setTimeout(() => {
                setSearchBar(false);
            }, 200);
        }
    };

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

    const handleSideBarClick = () => {
        setIsSidebarClicked(!isSidebarClicked);
    };

    const handleSearchFocus = (event) => {
        // Clear the placeholder when the input is focused
        event.target.placeholder = '';
    };

    const handleSearchBlur = (event) => {
        // Restore the placeholder when the input is blurred
        event.target.placeholder = '🔍 Search...';
    };

    const fetchPfp = async () => {
        const response = await fetch(
            process.env.REACT_APP_BACKEND + 'api/main/navbar/' + user.username,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer: ${user.idToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const json = await response.json();
        setPfp(json.pfp);
    };
    useEffect(() => {
        fetchPfp();
    }, []);

    return (
        <div className="navbar">
            <h1 className="logo-name">ReaList</h1>

            <div className="two-buttons">
                <button
                    className={`community-button ${
                        isFriendsClicked ? 'clicked' : ''
                    }`}
                    onClick={handleFriendButtonClick}
                >
                    Friends
                </button>

                <button
                    className={`community-button ${
                        isCommunityClicked ? 'clicked' : ''
                    }`}
                    onClick={handleCommunityButtonClick}
                >
                    Community
                </button>
            </div>

            <div className="right-side">
                <Magnify className="search-image" onClick={handleSearchClick} />

                {searchBar && (
                    <div className="search-bar-container">
                        <input
                            ref={inputRef}
                            className="search-bar"
                            type="text"
                            name=""
                            id=""
                            placeholder="Search..."
                        />
                        <CancelButton onClick={closeSearchClick} />
                    </div>
                )}

                <div className="side-bar-button">
                    <ProfileIcon pfp={pfp} onClick={handleSideBarClick} />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
