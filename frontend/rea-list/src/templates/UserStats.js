import '../styles/UserStats.css'
const UserStats = () => {
    return (
        
        <div className='stats-container'>
            <div className="user-top-artists">
                <h2>Your Top Artists: </h2>
                <img className= 'music-icon' src="https://cdn.icon-icons.com/icons2/3630/PNG/512/music_album_icon_227414.png" alt="" />
                <img className= 'music-icon' src="https://cdn.icon-icons.com/icons2/3630/PNG/512/music_album_icon_227414.png" alt="" />
                <img className= 'music-icon' src="https://cdn.icon-icons.com/icons2/3630/PNG/512/music_album_icon_227414.png" alt="" />
            </div>
            <div className="user-top-songs">
                <h2>Your Top Songs:</h2>
                <img className= 'music-icon' src="https://cdn.icon-icons.com/icons2/3630/PNG/512/music_album_icon_227414.png" alt="" />
                <img className= 'music-icon' src="https://cdn.icon-icons.com/icons2/3630/PNG/512/music_album_icon_227414.png" alt="" />
                <img className= 'music-icon' src="https://cdn.icon-icons.com/icons2/3630/PNG/512/music_album_icon_227414.png" alt="" />
            </div>
            <div className="user-compatable-friends">
                <h2>Your Most Compatable Friends:</h2>
            </div>
             
        </div>
        
        
    )
}

export default UserStats