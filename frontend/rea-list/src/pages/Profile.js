import UserStats from '../templates/UserStats.js';
import UserHead from '../templates/UserHead.js';
import { useLogout } from '../hooks/useLogout.js';

const Profile = () => {
    const { logout } = useLogout();
    const handleClick = () => {
        logout();
    };

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
