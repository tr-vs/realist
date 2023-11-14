import React, { useState } from 'react';
import '../styles/Sidebar.css';
import ProfileIcon from './ProfileIcon';
import { useAuthContext } from '../hooks/useAuthContext';
import { useEffect } from 'react';

const SideBar = ({ isSidebarClicked }) => {
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
  }, [user]);

  return (

    <div className="resize-handle">
        <div className={isSidebarClicked ? 'Sidebar active' : 'Sidebar'}>
            <div className='sidebar-top'>
                <ProfileIcon/>
            </div>
            <img
                className="listening-album-cover"
                src="https://media.pitchfork.com/photos/638902d2e5592afa444298b9/master/pass/SZA-SOS.jpg"
                alt=""
            />
            
            <h2>Song Name</h2>
            <h2>Artist</h2>

            <div>Some form of Statistics Right here:</div>
        </div>
    </div>
        
  );
};

export default SideBar;
