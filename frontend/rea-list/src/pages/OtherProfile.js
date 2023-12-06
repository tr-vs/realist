import UserStats from '../templates/UserStats.js';
import UserHead from '../templates/UserHead.js';
import ProfileNavbar from '../templates/ProfileNavbar.js';
import '../styles/OtherProfile.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext.js';
import { useEffect, useState } from 'react';
import LoadingPage from './LoadingPage';

const OtherProfile = () => {
    const navigate = useNavigate();
    const { username } = useParams();
    const { user } = useAuthContext();
    const [pfp, setPfp] = useState(null);
    const [artists, setArtists] = useState([]);
    const [songs, setSongs] = useState([]);
    const [following, setFollowing] = useState(false);
    const [connected, setConnected] = useState(false);
    const [followingarray, setFollowingArray] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProfile = async () => {
        const response = await fetch(
            process.env.REACT_APP_BACKEND + 'api/main/profile/' + username,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${user.idToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        const json = await response.json();

        if (json.error === 'User does not exist') {
            navigate('/usernotfound');
        } else if (json.connected) {
            if (json.artists !== undefined) {
                setArtists(json.artists);
                setSongs(json.songs);
            }
            if (json.followers.includes(user.username)) setFollowing(true);
            setConnected(true);
            setPfp(json.pfp[1]);
        }
        if (json.followers !== undefined) {
            setFollowers(json.followers);
        }
        if (json.following !== undefined) {
            setFollowingArray(json.following);
        }

        setLoading(false);
    };

    const followUnfollow = async () => {
        if (!following) {
            const response = await fetch(
                process.env.REACT_APP_BACKEND + 'api/main/follow',
                {
                    method: 'PATCH',
                    body: JSON.stringify({ otherUsername: username }),
                    headers: {
                        Authorization: `Bearer ${user.idToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.ok) setFollowing(true);
        } else {
            const response = await fetch(
                process.env.REACT_APP_BACKEND + 'api/main/unfollow',
                {
                    method: 'PATCH',
                    body: JSON.stringify({ otherUsername: username }),
                    headers: {
                        Authorization: `Bearer ${user.idToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.ok) setFollowing(false);
        }
    };

    useEffect(() => {
        if (username === user.username) {
            navigate('/profile');
        } else {
            fetchProfile();
        }
    }, [username, following]);

    return (
        <div>
            {loading ? (
                <LoadingPage />
            ) : (
                <div>
                    <ProfileNavbar />
                    <div className="profile-contents">
                        <div className="profile-info-container">
                            <UserHead
                                pfp={pfp}
                                username={username}
                                followers={followers}
                                following={followingarray}
                            />
                            <button
                                className="follow-button"
                                onClick={followUnfollow}
                            >
                                {!following ? 'Follow' : 'Unfollow'}
                            </button>
                        </div>
                        <UserStats
                            user={connected}
                            artists={artists}
                            songs={songs}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default OtherProfile;
