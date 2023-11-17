import React, { useState } from 'react';
import '../styles/Sidebar.css';
import ProfileIcon from './ProfileIcon';
import SecondProfileIcon from './SecondProfileIcon';
import { useAuthContext } from '../hooks/useAuthContext';
import { useEffect } from 'react';

const SideBar = ({ isSidebarClicked }) => {
    return (
        <div className="resize-handle">
            <div className={isSidebarClicked ? 'Sidebar active' : 'Sidebar'}>
                <div className="content-container">
                    <div className="profile-icon">
                        <img
                            className="listening-album-cover"
                            src="https://media.pitchfork.com/photos/5929c43cea9e61561daa80db/master/pass/a240bddc.jpg"
                            alt=""
                        />
                        <SecondProfileIcon />
                    </div>
                    <div className="information-container">
                        <h2>Song Name</h2>
                        <h2>Artist</h2>
                        <h3>Top Artists Today: </h3>
                        <ul>
                            <li>Chief Keef</li>
                            <li>Chief Keef</li>
                            <li>Chief Keef</li>
                            <li>Chief Keef</li>
                            <li>Chief Keef</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
