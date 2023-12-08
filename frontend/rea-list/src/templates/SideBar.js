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
    const [isSpotifyConnected, setIsSpotifyConnected] = useState(false);

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

        if (json.threeRec !== undefined) setRecSongs(json.threeRec);

        setUserProfile(json.pfp);

        if (json.nowPlaying === undefined) {
        } else if (json.nowPlaying.item !== undefined) {
            setCurrentSong(json.nowPlaying.item);
        } else {
            setCurrentSong(json.nowPlaying.track);
        }
    };

    useEffect(() => {
        if (user.spotifyToken) {
            fetchProfile();
            setIsSpotifyConnected(true);
        } else {
            setIsSpotifyConnected(false);
        }
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
                                    : 'https://t3.ftcdn.net/jpg/04/63/51/28/360_F_463512856_GEk2IrQkYatpRVR9YDhiZgRY2z00Zet3.jpg'
                            }
                            alt=""
                        />
                        <SecondProfileIcon profile={userProfile} />
                    </div>

                    {isSpotifyConnected && (
                        <div className="information-container">
                            <div className="current-song-info">
                                <h2 className="current-song-title">
                                    Listening to:
                                </h2>
                                <h3 className="current-song-name">
                                    {currentSong?.name !== undefined
                                        ? currentSong.name
                                        : 'Song Name'}
                                </h3>
                                <h3 className="current-song-artist">
                                    {currentSong?.artists !== undefined
                                        ? currentSong.artists.map(
                                              (artist) => artist.name + " "
                                          )
                                        : 'Artist'}
                                </h3>
                            </div>
                            <div className="recommended-song">
                                <h2 className="recommended-song-title">
                                    Songs for you:
                                </h2>
                                <iframe
                                    style={{ border: 12, height: 80, padding:5}}
                                    src={`https://open.spotify.com/embed/track/${recSongs[0]}`}
                                    width="80%"
                                    height="100%"
                                    allowfullscreen=""
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                    loading="lazy"
                                ></iframe>
                                <iframe
                                    style={{ border: 12, height: 80, padding: 5}}
                                    src={`https://open.spotify.com/embed/track/${recSongs[1]}`}
                                    width="80%"
                                    height="100%"
                                    allowfullscreen=""
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                    loading="lazy"
                                ></iframe>
                                <iframe
                                    style={{ border: 12, height: 80, padding: 5, marginBottom:30}}
                                    src={`https://open.spotify.com/embed/track/${recSongs[2]}`}
                                    width="80%"
                                    height="100%"
                                    allowfullscreen=""
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                    loading="lazy"
                                ></iframe>
                            </div>
                        </div>
                    )}
                    {!isSpotifyConnected && (
                        <h3 className="recommended-song-text">
                            Connect to Spotify to see your music
                        </h3>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SideBar;
