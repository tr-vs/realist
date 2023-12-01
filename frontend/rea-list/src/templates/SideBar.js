import React, { useState } from 'react';
import '../styles/Sidebar.css';
import ProfileIcon from './ProfileIcon';
import SecondProfileIcon from './SecondProfileIcon';
import { useAuthContext } from '../hooks/useAuthContext';
import { useEffect } from 'react';

const SideBar = ({ isSidebarClicked }) => {
    const { user } = useAuthContext();
    const [userProfile, setUserProfile] = useState(
        'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'
    );
    const [currentSong, setCurrentSong] = useState(undefined);
    const [recSongs, setRecSongs] = useState([]);

    const fetchProfile = async () => {
        const response = await fetch(
            process.env.REACT_APP_BACKEND + 'api/main/sidebar/' + user.username,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${user.idToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        // Gets users current song info
        const json = await response.json();

        if (json.threeRec !== undefined)
            setRecSongs(json.threeRec.map((track) => track.id));

        setUserProfile(json.pfp);

        if (json.nowPlaying.item !== undefined) {
            setCurrentSong(json.nowPlaying.item);
        } else {
            setCurrentSong(json.nowPlaying.track);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <div className="resize-handle">
            <div className={isSidebarClicked ? 'Sidebar active' : 'Sidebar'}>
                <div className="content-container">
                    <div className="profile-icon">
                        <img
                            className="listening-album-cover"
                            src={
                                currentSong?.album?.images !== undefined
                                    ? currentSong.album.images[0].url
                                    : 'https://media.pitchfork.com/photos/5929c43cea9e61561daa80db/master/pass/a240bddc.jpg'
                            }
                            alt=""
                        />
                        <SecondProfileIcon profile={userProfile} />
                    </div>

                    <div className="information-container">
                        <div className="current-song-info">
                            <h1 className="current-song-info-text">
                                Listening to:
                            </h1>
                            <h2 className="current-song-info-text">
                                {currentSong?.name !== undefined
                                    ? currentSong.name
                                    : 'Song Name'}
                            </h2>
                            <h2 className="current-song-info-text">
                                {currentSong?.artists !== undefined
                                    ? currentSong.artists.map(
                                          (artist) => artist.name
                                      )
                                    : 'Artist'}
                            </h2>
                        </div>

                        <div className="recommended-song">
                            <h3 className="recommended-song-text">
                                {' '}
                                songs for you{' '}
                            </h3>
                            <iframe
                                style={{ border: 12, height: 80 }}
                                src={`https://open.spotify.com/embed/track/${recSongs[0]}`}
                                width="80%"
                                height="100%"
                                allowfullscreen=""
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                            ></iframe>
                            <iframe
                                style={{ border: 12, height: 80 }}
                                src={`https://open.spotify.com/embed/track/${recSongs[1]}`}
                                width="80%"
                                height="100%"
                                allowfullscreen=""
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                            ></iframe>
                            <iframe
                                style={{ border: 12, height: 80 }}
                                src={`https://open.spotify.com/embed/track/${recSongs[2]}`}
                                width="80%"
                                height="100%"
                                allowfullscreen=""
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
