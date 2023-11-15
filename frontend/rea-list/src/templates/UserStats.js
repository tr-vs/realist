import '../styles/UserStats.css'
const UserStats = () => {
    return (
        
        <div className='stats-container'>
            <div className='user-top-artists'>
                <div className='titleTA'>
                <h2>Your Top Artists: </h2>
                </div>
                <img className= 'music-icon' src="https://cdn.icon-icons.com/icons2/3630/PNG/512/music_album_icon_227414.png" alt="" />
                <img className= 'music-icon' src="https://cdn.icon-icons.com/icons2/3630/PNG/512/music_album_icon_227414.png" alt="" />
                <img className= 'music-icon' src="https://cdn.icon-icons.com/icons2/3630/PNG/512/music_album_icon_227414.png" alt="" />
            </div>
            <div className='user-top-songs'>
                <div className='titleTS' >
                <h2>Your Top Songs:</h2>
                </div>
                <img className= 'music-icon' src="https://cdn.icon-icons.com/icons2/3630/PNG/512/music_album_icon_227414.png" alt="" />
                <img className= 'music-icon' src="https://cdn.icon-icons.com/icons2/3630/PNG/512/music_album_icon_227414.png" alt="" />
                <img className= 'music-icon' src="https://cdn.icon-icons.com/icons2/3630/PNG/512/music_album_icon_227414.png" alt="" />
            </div>
            <div className='user-compatible-friends'>
                <div className='titleCF'>
                <h2>Your Most Compatible Friends:</h2>
                </div>
                <img className= 'people-icon' src="https://icon-library.com/images/people-png-icon/people-png-icon-7.jpg" alt="" />
                <img className= 'people-icon' src="https://icon-library.com/images/people-png-icon/people-png-icon-7.jpg" alt="" />
                <img className= 'people-icon' src="https://icon-library.com/images/people-png-icon/people-png-icon-7.jpg" alt="" />
                
            </div>
             
        </div>
        
        
    )
}

export default UserStats