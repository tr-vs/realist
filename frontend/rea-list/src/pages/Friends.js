import Posts from "../templates/Posts"
import { useState } from "react"
import '../styles/FriendsPage.css'

const Friends = () => {
    const [showPlaylist, setShowPlaylist] = useState(false)

    return (
        <div className="total-post-container">
            <div className="post-contents">
                {/* Map through all friends in database, pass values as props for post */}
                <div className="post-contents-titles-container">
                    <h1 className='page-title'>Friends Music</h1>
                </div>
                
                <Posts num={0}></Posts>
                <Posts num={1}></Posts>
                <Posts num={2}></Posts>
                <Posts num={0}></Posts>
                <Posts num={1}></Posts>
                <Posts num={2}></Posts>
                
            </div>
            <div className="playlist-container">
                <h1 onClick={() => setShowPlaylist(!showPlaylist)} className="playlist-generator">Generate ReaList </h1>
                {(showPlaylist && 
                    <iframe style={{border:12,}}
                        src="https://open.spotify.com/embed/playlist/6LNJISaXgIUpl8TZlnNTI8?utm_source=generator" 
                        width="400" 
                        height="800" 
                        frameBorder="0" 
                        allowfullscreen="" 
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                        loading="lazy">
                    </iframe>


                )}
            </div>
        </div>
            
        
    )
}

export default Friends