import UserStats from '../templates/UserStats.js';
import UserHead from '../templates/UserHead.js';
import ProfileNavbar from '../templates/ProfileNavbar.js';
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
                <UserHead pfp={pfp} username={username} />
                <button>Follow</button>
                <UserStats artists={artists} songs={songs} />
            </div>
        </>
    );
};

export default OtherProfile;
