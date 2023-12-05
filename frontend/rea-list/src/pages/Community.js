import Posts from '../templates/Posts';
import '../styles/FriendsPage.css';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

const Community = () => {
    const { user } = useAuthContext();
    const [communityPosts, setCommunityPosts] = useState([]);
    const [showPlaylist, setShowPlaylist] = useState(false);
    const [playlistLink, setPlaylistLink] = useState(false);

    const fetchCommunityPostData = async () => {
        let response = await fetch(
            process.env.REACT_APP_BACKEND + 'api/main/community',
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${user.idToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.status === 200) {
            response = await response.json();
            setPlaylistLink(
                `https://open.spotify.com/embed/playlist/${response.playlistID}?utm_source=generator`
            );
            const posts = response.communityUsers.map((post) => {
                return <Posts data={post}></Posts>;
            });

            setCommunityPosts(posts);
        } else if (response.status === 201) {
            response = await response.json();
            const posts = response.communityUsers.map((post) => {
                return <Posts data={post}></Posts>;
            });

            setCommunityPosts(posts);
        }
    };

    useEffect(() => {
        fetchCommunityPostData();
    }, []);

    return (
        <>
            <div className="music-container">
                <div className="post-contents">
                    <h1 className="page-title">Community Music</h1>
                    {communityPosts}
                </div>
                {playlistLink && (
                    <div className="side-container">
                        <div className="left-arrow-container">
                            <svg
                                className="left-arrow"
                                onClick={() => setShowPlaylist(!showPlaylist)}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                style={{
                                    fill: 'white',
                                    width: '60px',
                                    height: '60px',
                                }}
                            >
                                {' '}
                                {/* Set the fill color here */}
                                <g data-name="Double left">
                                    <path d="M12 17a1 1 0 0 1-.707-.293l-4-4a1 1 0 0 1 0-1.414l4-4a1 1 0 1 1 1.414 1.414L9.414 12l3.293 3.293A1 1 0 0 1 12 17z" />
                                    <path d="M16 17a1 1 0 0 1-.707-.293l-4-4a1 1 0 0 1 0-1.414l4-4a1 1 0 1 1 1.414 1.414L13.414 12l3.293 3.293A1 1 0 0 1 16 17z" />
                                </g>
                            </svg>
                        </div>

                        {showPlaylist && (
                            <div className="playlist-container">
                                <iframe
                                    style={{ border: 12 }}
                                    src={playlistLink}
                                    width="95%"
                                    height="20%"
                                    allowfullscreen=""
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                    loading="lazy"
                                ></iframe>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default Community;
