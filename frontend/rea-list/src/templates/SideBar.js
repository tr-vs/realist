import '../styles/Sidebar.css';
import ProfileIcon from './ProfileIcon';
import { useAuthContext } from '../hooks/useAuthContext';
import { useEffect, useState } from 'react';

const SideBar = ({isSidebarClicked}) => {
    // only load data if they are logged in
    const { user } = useAuthContext();
    const [error, setError] = useState(null);

    useEffect(() => {
        const getSideBar = async () => {
            // TODO: create sidebar route
            const response = await fetch('/api/sideBar', {
                headers: {
                    Authorization: `Bearer ${user.idToken}`,
                },
            });

            const json = await response.json();
        };

        if (user) getSideBar();
    });
    return (
        <div className={isSidebarClicked ? 'Sidebar active' : 'Sidebar'}>
             
            <img className='listening-album-cover' src="https://media.pitchfork.com/photos/638902d2e5592afa444298b9/master/pass/SZA-SOS.jpg" alt="" />
            {/* <ProfileIcon/> */}
            <h2>Song Name</h2>
            <h2>Artist</h2>

            <div>
                Some form of Statistics Right here:
            </div>

        </div>
    );
};

export default SideBar;
