import '../styles/HomePage.css';
import Navbar from '../templates/Navbar';
import Friends from './Friends';
import Community from './Community';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

const Home = () => {
    const [isCommunityClicked, setIsCommunityClicked] = useState(false);
    const [isFriendsClicked, setIsFriendsClicked] = useState(true);
    const { user } = useAuthContext();

    useEffect(() => {
        const getHome = async () => {
            // TODO: create home route
            const response = await fetch('/api/home', {
                headers: {
                    Authorization: `Bearer ${user.idToken}`,
                },
            });

            const json = await response.json();
        };

        if (user) getHome();
    });

    return (
        <div>
            <Navbar
                isFriendsClicked={isFriendsClicked}
                setIsFriendsClicked={setIsFriendsClicked}
                isCommunityClicked={isCommunityClicked}
                setIsCommunityClicked={setIsCommunityClicked}
            />

            <div className="full-page">
                {/* <-- Two pages for community and friends and statistics-> */}
                <div className="page-content">
                    {isFriendsClicked && <Friends></Friends>}
                    {isCommunityClicked && <Community></Community>}
                </div>
                {/* <div className='sidebar'>
                    <h2>SideBar will be here</h2>
                </div> */}
            </div>
        </div>
    );
};

export default Home;
