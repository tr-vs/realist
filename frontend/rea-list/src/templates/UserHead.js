import '../styles/UserHead.css';
import FollowingPopup from './FollowingPopup';
import { useState } from 'react';

const UserHead = (props) => {
    const following = props.following;
    const followers = props.followers;
    const pfp = props.pfp
        ? props.pfp
        : 'https://i.pinimg.com/736x/a7/35/e0/a735e0682a89e2900abf4eace20cd863.jpg';
    const username = props.username ? props.username : 'Lil Silly Cat 6';
    const [showFollowerPopUp, setShowFollowerPopUp] = useState(false);
    const [showFollowingPopUp, setShowFollowingPopUp] = useState(false);

    const displayFollowerPopUp = () => {
        setShowFollowerPopUp(true);
        document.body.style.overflow = 'hidden';
    };

    const closeFollowerPopUp = () => {
        setShowFollowerPopUp(false);
        document.body.style.overflow = 'auto';
    };

    const displayFollowingPopUp = () => {
        setShowFollowingPopUp(true);
        document.body.style.overflow = 'hidden';
    };

    const closeFollowingPopUp = () => {
        setShowFollowingPopUp(false);
        document.body.style.overflow = 'auto';
    };
    console.log('Userhead following ', following);

    return (
        <>
            <div className="user-head-container">
                <div className="user-head">
                    {/* Add Profile Pic Component */}
                    {/* Will need to pass spotify user, profile pic, etc  */}
                    <img className="profile-image" src={pfp} alt="" />
                    <h1 className="user-name">{username}</h1>
                </div>
                <div className="follower-stats">
                    <h2 onClick={displayFollowerPopUp} className="followers">
                        Followers: {Object.keys(followers).length}
                    </h2>
                    <h2 onClick={displayFollowingPopUp} className="following">
                        Following: {Object.keys(following).length}
                    </h2>
                </div>
                {showFollowerPopUp && (
                    <FollowingPopup
                        follow={followers}
                        onClick={closeFollowerPopUp}
                    />
                )}
                {showFollowingPopUp && (
                    <FollowingPopup
                        follow={following}
                        onClick={closeFollowingPopUp}
                    />
                )}
            </div>
        </>
    );
};

export default UserHead;
