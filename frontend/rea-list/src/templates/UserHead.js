import '../styles/UserHead.css';

const UserHead = () => {
    return (
        <div className='user-head-container'>
            <div className="user-head">
            {/* Add Profile Pic Component */}
            {/* Will need to pass spotify user, profile pic, etc  */}
                <img className = 'profile-image' src="https://i.pinimg.com/736x/a7/35/e0/a735e0682a89e2900abf4eace20cd863.jpg" alt="" />
                <h1 className='user-name'>Lil Silly Cat 6</h1>
            </div>
            <div className='follower-stats'>
                <h2 className='followers'>Followers: 10</h2>
                <h2 className='following'>Following: 100</h2>

            </div>
        </div> 
        
        

    )
}

export default UserHead;