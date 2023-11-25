import React, { useState } from 'react';
import '../styles/Sidebar.css';
import ProfileIcon from './ProfileIcon';
import SecondProfileIcon from './SecondProfileIcon';
import { useAuthContext } from '../hooks/useAuthContext';
import { useEffect } from 'react';

const SideBar = ({ isSidebarClicked }) => {
    const { user } = useAuthContext();
    const [error, setError] = useState(null);

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
                        <div className='current-song-info'>
                            <h1 className='current-song-info-text'>Listening to:</h1>
                            <h2 className='current-song-info-text'>Song Name</h2>
                            <h2 className='current-song-info-text'>Artist</h2>
                        </div>
                        
                        
                        <div className='recommended-song'>
                            <h3 className='recommended-song-text'> songs for you </h3>
                            <iframe style={{border:12, height:80}} 
                                    src="https://open.spotify.com/embed/track/6scpNkWEmUxmKY7nYjVLsX?utm_source=generator" 
                                    width="80%" 
                                    height="100%"  
                                    allowfullscreen="" 
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                                    loading="lazy">
                            </iframe>
                            <iframe style={{border:12, height:80}} 
                                    src="https://open.spotify.com/embed/track/3bBmpVl9rQKJsFFGLFilIS?utm_source=generator" 
                                    width="80%" 
                                    height="100%"  
                                    allowfullscreen="" 
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                                    loading="lazy">
                            </iframe>
                           
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
