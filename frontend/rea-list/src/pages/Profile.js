import UserStats from '../templates/UserStats.js';
import UserHead from '../templates/UserHead.js';
import { useLogout } from '../hooks/useLogout.js';
import { useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext.js';

const Profile = () => {
    const { logout } = useLogout();
    const { user, dispatch } = useAuthContext();
    let response;

    const handleClick = () => {
        logout();
    };

    useEffect(() => {
        // Extract the query value from the URL
        const query = window.location.hash.substring(1);
        const decipher = new URLSearchParams(query);
        const access_token = decipher.get('access_token');
        const refresh_token = decipher.get('refresh_token');
        const data = { access_token, refresh_token };

        async function updateDB() {
            const response = await fetch(
                'https://realist.onrender.com/api/users/token',
                {
                    method: 'PATCH',
                    body: JSON.stringify(data),
                    headers: {
                        Authorization: `Bearer ${user.idToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            const json = await response.json();
            dispatch({ type: 'LOGIN', payload: json });
        }

        if (data.access_token !== null && !user.spotifyToken) {
            updateDB();
        }
    });
    return (
        <div>
            <UserHead />
            <div>
                <button onClick={handleClick}>Log Out</button>
            </div>
            <a href="https://realist.onrender.com/api/spotify/auth">
                <button>Connect to Spotify</button>
            </a>
            <UserStats />
        </div>
    );
};

export default Profile;
