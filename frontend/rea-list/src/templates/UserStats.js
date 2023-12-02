import '../styles/UserStats.css';
import { useEffect, useState } from 'react';
const UserStats = ({ user, songs, artists }) => {
    const [isSpotifyConnected, setIsSpotifyConnected] = useState(false)

    useEffect(() => {
        if(user.spotifyToken) {
            setIsSpotifyConnected(true)
        } else {
            setIsSpotifyConnected(false)
        }
    }, [])
    return (
        
        <div className="stats-container">
            <div className="user-top-artists">
                <div className="titleTA">
                    <h2>Your Top Artists... </h2>
                </div>
                {isSpotifyConnected && (
                    <div className=".user-top-artists">
                        <iframe
                            style={{ border: 12, height: 160 }}
                            src="https://open.spotify.com/embed/artist/06HL4z0CvFAxyc27GXpf02?utm_source=generator&theme=0"
                            width="120%"
                            height="120%"
                            frameBorder="0"
                            allowfullscreen=""
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                        ></iframe>
                        <iframe
                            style={{ border: 12, height: 160 }}
                            src="https://open.spotify.com/embed/artist/2kxP07DLgs4xlWz8YHlvfh?utm_source=generator&theme=0"
                            width="120%"
                            height="120%"
                            frameBorder="0"
                            allowfullscreen=""
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                        ></iframe>
                        <iframe
                            style={{ border: 12, height: 160 }}
                            src="https://open.spotify.com/embed/artist/2h93pZq0e7k5yf4dywlkpM?utm_source=generator&theme=0"
                            width="120%"
                            height="120%"
                            frameBorder="0"
                            allowfullscreen=""
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                        ></iframe>
                    </div>
                )}
                {!isSpotifyConnected && (
                    <h2>Spotify needed</h2>
                )}
            </div>
            <div className="user-top-songs">
                <div className="titleTS">
                    <h2>Your Top Songs...</h2>
                </div>
                {isSpotifyConnected && (
                    <>
                        <iframe
                            style={{ border: 12, height: 88 }}
                            src="https://open.spotify.com/embed/track/1Iq8oo9XkmmvCQiGOfORiz?utm_source=generator&theme=0"
                            width="100%"
                            height="352"
                            frameBorder="0"
                            allowfullscreen=""
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                        ></iframe>
                        <iframe
                            style={{ border: 12, height: 88 }}
                            src="https://open.spotify.com/embed/track/1cuYCAodLWgzhwE2KFZ8rC?utm_source=generator&theme=0"
                            width="100%"
                            height="50%"
                            frameBorder="0"
                            allowfullscreen=""
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                        ></iframe>
                        <iframe
                            style={{ border: 12, height: 88 }}
                            src="https://open.spotify.com/embed/track/0SA0mMXWh23raZ6xzOCU2V?utm_source=generator&theme=0"
                            width="100%"
                            height="50%"
                            frameBorder="0"
                            allowfullscreen=""
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                        ></iframe>
                        <iframe
                            style={{ border: 12, height: 88 }}
                            src="https://open.spotify.com/embed/track/28wmzW39UTv4iYCKKkhIQP?utm_source=generator&theme=0"
                            width="100%"
                            height="352"
                            frameBorder="0"
                            allowfullscreen=""
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                        ></iframe>
                        <iframe
                            style={{ border: 12, height: 88 }}
                            src="https://open.spotify.com/embed/track/70YTBH8vOGJNMhy6186yFm?utm_source=generator&theme=0"
                            width="100%"
                            height="352"
                            frameBorder="0"
                            allowfullscreen=""
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                        ></iframe>
                    </>
                )}
                {!isSpotifyConnected && (
                    <h2>Spotify needed</h2>
                )}
            </div>
        </div>
    );
};

export default UserStats;
