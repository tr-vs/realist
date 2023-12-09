import { useState } from 'react';
import Color from 'color-thief-react';
import ProfileIcon from './ProfileIcon';
import '../styles/PostsStyles.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const Posts = ({ data }) => {
    // props to pass:
    // Username
    // Song Name
    // Artist of Song

    const [predominantColor, setPredominantColor] = useState('');
    const [showSongPlayer, setShowSongPlayer] = useState(false);
    const [animateLeft, setAnimateLeft] = useState(false);
    const [showSongInfo, setShowSongInfo] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const navigate = useNavigate();

    const pfp = data ? data.pfp[0] : undefined;
    const username = data ? data.username : 'Username';
    let nowPlaying, name, artist, cover, id;

    const updateScreenWidth = () => {
        setScreenWidth(window.innerWidth);
    };

    if (data !== undefined) {
        nowPlaying = JSON.parse(data.nowPlaying);
        if (nowPlaying.item !== undefined) {
            cover = nowPlaying.item.album.images[1].url;
            ({ name, id } = nowPlaying.item);
            const artists = nowPlaying.item.artists.map(
                (artist) => artist.name
            );
            artist = artists.join(', ');
        } else {
            cover = nowPlaying.track.album.images[1].url;
            ({ name, id } = nowPlaying.track);
            const artists = nowPlaying.track.artists.map(
                (artist) => artist.name
            );
            artist = artists.join(', ');
        }
    }

    useEffect(() => {
        window.addEventListener("resize", updateScreenWidth);
        console.log("screen width: ",screenWidth)
        

        return () => {
            window.removeEventListener("resize", updateScreenWidth);
        };
    }, []);

    return (
    <>
        <div className="profile-content">
            {screenWidth > 770 && (
                <>
                    <Color src={cover} crossOrigin="anonymous" format="hex">
                        {({ data, loading }) => {
                            setPredominantColor(data);
                        }}
                    </Color>
                    <img
                        id={name}
                        className="cover-images"
                        src={cover}
                        alt=""
                        onMouseOver={() => {
                            document.getElementById(name).style.transform =
                                'translate(-12px, -12px)';
                            document.getElementById(
                                name
                            ).style.boxShadow = `12px 12px 20px 3px ${predominantColor}`;
                        }}
                        onMouseOut={() => {
                            document.getElementById(name).style.transform =
                                'translate(0px, 0px)';
                            document.getElementById(
                                name
                            ).style.boxShadow = `0px 0px 0px 0px ${predominantColor}`;
                        }}
                        onClick={() => {
                            setShowSongPlayer(!showSongPlayer);
                        }}
                    />
                    <div className="song-info">
                        <div className="user-profile-container">
                            <div className="profile-pic">
                                <ProfileIcon
                                    onClick={() => navigate('/' + username)}
                                    pfp={pfp}
                                />
                            </div>
                            <div className="username">
                                <h4 onClick={() => navigate('/' + username)}>{username}</h4>
                            </div>
                        </div>

                        {!showSongInfo && (
                            <h3
                                className={`song-name ${
                                    animateLeft ? 'slide-left' : ''
                                }`}
                            >
                                {name}
                            </h3>
                        )}
                        {!showSongInfo && (
                            <h3
                                className={`song-stat ${
                                    animateLeft ? 'slide-left' : ''
                                }`}
                            >
                                {artist}
                            </h3>
                        )}
                    </div>
                    <div className="song-player">
                        {showSongPlayer && (
                            <iframe
                                style={{ border: 12 }}
                                className="slide-in"
                                src={`https://open.spotify.com/embed/track/${id}`}
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                allowfullscreen=""
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                            ></iframe>
                        )}
                    </div>
                </>
            )}
            

            {/* {show for reduced screen} */}
            {screenWidth < 769 && (
            <div className='reduced-container'>
                <div className="user-profile-container">
                    <div className="profile-pic reduced-profile">
                        <ProfileIcon
                            onClick={() => navigate('/' + username)}
                            pfp={pfp}
                        />
                    </div>
                    <div className="username">
                        <h4 onClick={() => navigate('/' + username)}>{username}</h4>
                    </div>
                </div>
                <div className="song-player reduced">
                    <iframe
                        style={{ border: 12 }}
                        className="slide-in"
                        src={`https://open.spotify.com/embed/track/${id}`}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allowfullscreen=""
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
            )}
        </div>
    </>
    );
    
};
export default Posts;
