import UserStats from "../templates/UserStats.js";
import UserHead from "../templates/UserHead.js";
const Profile = () => {
    return (
        <div>
            <UserHead/>
            <a href="http://localhost:3000/api/spotify/auth">
                <button>Connect to Spotify</button>
            </a>
            <UserStats/>
        </div>
        
    );
};

export default Profile;
