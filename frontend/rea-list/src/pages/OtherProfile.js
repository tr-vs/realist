import UserStats from '../templates/UserStats.js';
import UserHead from '../templates/UserHead.js';
import ProfileNavbar from '../templates/ProfileNavbar.js';
import '../styles/OtherProfile.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext.js';
import { useEffect, useState } from 'react';

const OtherProfile = () => {
    const navigate = useNavigate();
    const { username } = useParams();
    const { user } = useAuthContext();
    const [pfp, setPfp] = useState(null);
    const [artists, setArtists] = useState([]);
    const [songs, setSongs] = useState([]);
    const [following, setFollowing] = useState(false);

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
        } else {
            setPfp(json.pfp[1]);

            if (json.topArtists !== undefined) {
                setArtists(json.topArtists.items);
                setSongs(json.topSongs.items);
            }
            if (json.followers.includes(user.username)) setFollowing(true);
        }
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
        if (username === user.username) navigate('/profile');
        fetchProfile();
    }, []);

    return (
        <>
                <ProfileNavbar />
                <div className="profile-contents">
                    <div className='profile-info-container'>
                        <UserHead pfp={pfp} username={username} />
                        <button className='follow-button' onClick={followUnfollow}>
                            {!following ? 'Follow' : 'Unfollow'}
                        </button>
                    </div>
                    <UserStats artists={artists} songs={songs} />
                </div>
        </>
    );
};

export default OtherProfile;
