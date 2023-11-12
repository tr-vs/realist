import '../styles/UserStats.css'
const UserStats = () => {
    return (
        
        <div className='stats-container'>
            <div className="user-top-artists">
                <h2>Your Top Artists: </h2>
                <img className src="https://static.vecteezy.com/system/resources/thumbnails/019/879/186/small/user-icon-on-transparent-background-free-png.png" alt="" />
                <img className src="https://static.vecteezy.com/system/resources/thumbnails/019/879/186/small/user-icon-on-transparent-background-free-png.png" alt="" />
            </div>
            <div className="user-top-songs">
                <h2>Your Top Songs:</h2>
                <img className src="https://static.vecteezy.com/system/resources/thumbnails/019/879/186/small/user-icon-on-transparent-background-free-png.png" alt="" />
                <img className src="https://static.vecteezy.com/system/resources/thumbnails/019/879/186/small/user-icon-on-transparent-background-free-png.png" alt="" />

            </div>
            <div className="user-compatable-friends">
                <h2>Your Most Compatable Friends:</h2>
            </div>
             
        </div>
        
        
    )
}

export default UserStats