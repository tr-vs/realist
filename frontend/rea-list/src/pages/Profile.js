import UserStats from '../templates/UserStats.js';
import UserHead from '../templates/UserHead.js';
import { useLogout } from '../hooks/useLogout.js';
import { useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext.js';

const Profile = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

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
            await fetch('http://localhost:3000/api/users/token', {
                method: 'PATCH',
                body: JSON.stringify(data),
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
            });
        }

        if (data.access_token.length !== 0) updateDB();
    });
    return (
        <div>
            <UserHead />
            <div>
                <button onClick={handleClick}>Log Out</button>
            </div>
            <a href="http://localhost:3000/api/spotify/auth">
                <button>Connect to Spotify</button>
            </a>
            <UserStats />
        </div>
    );
};

export default Profile;
