import UserStats from '../templates/UserStats.js';
import UserHead from '../templates/UserHead.js';
import { useLogout } from '../hooks/useLogout.js';
import { useEffect } from 'react';

const Profile = () => {
    const { logout } = useLogout();
    const handleClick = () => {
        logout();
    };
    useEffect(() => {
        // Extract the query value from the URL
        const query = window.location.hash.substring(1);
        const decipher = new URLSearchParams(query);

        // front end now has access to token
        // todo: send back to backend to update
        // user token
        console.log(decipher.get('access_token'));
    }, []);
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
