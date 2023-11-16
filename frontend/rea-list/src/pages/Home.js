import '../styles/HomePage.css';
import Navbar from '../templates/Navbar';
import Friends from './Friends';
import Community from './Community';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import SideBar from '../templates/SideBar';

const Home = () => {
    const [isCommunityClicked, setIsCommunityClicked] = useState(false);
    const [isFriendsClicked, setIsFriendsClicked] = useState(true);
    const [isSidebarClicked, setIsSidebarClicked] = useState(false);

    return (
        <div>
            <Navbar
                isFriendsClicked={isFriendsClicked}
                setIsFriendsClicked={setIsFriendsClicked}
                isCommunityClicked={isCommunityClicked}
                setIsCommunityClicked={setIsCommunityClicked}
                setIsSidebarClicked={setIsSidebarClicked}
                isSidebarClicked={isSidebarClicked}
            />

            <div className="full-page">
                {/* <-- Two pages for community and friends and statistics-> */}
                <div className="page-content">
                    {isFriendsClicked && <Friends></Friends>}
                    {isCommunityClicked && <Community></Community>}
                </div>
                {<SideBar isSidebarClicked={isSidebarClicked} />}
            </div>
        </div>
    );
};

export default Home;
