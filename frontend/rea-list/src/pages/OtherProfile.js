import UserStats from '../templates/UserStats.js';
import UserHead from '../templates/UserHead.js';
import ProfileNavbar from '../templates/ProfileNavbar.js';
import Profile from './Profile.js';



const OtherProfile = () => {

    return (
        <>
            <ProfileNavbar/>
            <div className='profile-contents'>
                <UserHead />
                <button>Follow</button>
                <UserStats />
            </div>

        </>
    )
}

export default OtherProfile