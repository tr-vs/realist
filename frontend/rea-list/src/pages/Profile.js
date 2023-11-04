import UserStats from "../templates/UserStats";
const Profile = () => {
    return (
        <div>
            <a href="http://localhost:3000/api/spotify/auth">
                <button>Connect to Spotify</button>
            </a>
            <UserStats></UserStats>
        </div>
        
    );
};

export default Profile;
