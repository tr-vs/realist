import { useState } from 'react';
import Color from 'color-thief-react';
import '../styles/PostsStyles.css';
const Posts = (props) => {
    // props to pass:
    // Username
    // Song Name
    // Artist of Song

    const [predominantColor, setPredominantColor] = useState('');
    const [showSongPlayer, setShowSongPlayer] = useState(false);
    const [animateLeft, setAnimateLeft] = useState(false);
    const [showSongInfo, setShowSongInfo] = useState(false);

    const links = [
        'https://media.pitchfork.com/photos/5929c43cea9e61561daa80db/master/pass/a240bddc.jpg',
        'https://images.squarespace-cdn.com/content/v1/5e40c67d62402c0ce36a6bf0/1603566903470-375SZI5GD0F53P2LPGXR/Ef1eZcOX0AEmSs_.jpg',
        'https://upload.wikimedia.org/wikipedia/en/5/5e/Madvillainy_cover.png',
    ];
    const username = props.data ? props.data.username : 'Username';
    let nowPlaying = 'asdf';
    let song = 'Song';
    let artist = 'Artist';
    let cover = links[0];
    let id = '';
    if (props.data !== undefined) {
        nowPlaying = JSON.parse(props.data.nowPlaying);
        if (nowPlaying.item !== undefined) {
            cover = nowPlaying.item.album.images[1].url;
            song = nowPlaying.item.name;
            id = nowPlaying.item.id;
            id = nowPlaying.item.id;
            const artists = nowPlaying.item.artists.map(
                (artist) => artist.name
            );
            artist = artists.join(', ');
        } else {
            cover = nowPlaying.track.album.images[1].url;
            song = nowPlaying.track.name;
            id = nowPlaying.track.id;
            id = nowPlaying.track.id;
            const artists = nowPlaying.track.artists.map(
                (artist) => artist.name
            );
            artist = artists.join(', ');
        }
    }
    return (
        <div className="profile-content">
            <Color src={cover} crossOrigin="anonymous" format="hex">
                {({ data, loading }) => {
                    setPredominantColor(data);
                }}
            </Color>
            <img
                id={song}
                className="cover-images"
                src={cover}
                alt=""
                onMouseOver={() => {
                    document.getElementById(song).style.transform =
                        'translate(-12px, -12px)';
                    document.getElementById(
                        song
                    ).style.boxShadow = `12px 12px 20px 3px ${predominantColor}`;
                }}
                onMouseOut={() => {
                    document.getElementById(song).style.transform =
                        'translate(0px, 0px)';
                    document.getElementById(
                        song
                    ).style.boxShadow = `0px 0px 0px 0px ${predominantColor}`;
                }}
                onClick={() => {
                    setShowSongPlayer(!showSongPlayer);
                }}
            />
            <div className="song-info">
                <h4>{username}</h4>
                {!showSongInfo && (
                    <h3
                        className={`song-stat ${
                            animateLeft ? 'slide-left' : ''
                        }`}
                    >
                        {song}
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
                <h5>Reaction: </h5>
                {/* comment  test comment*/}
            </div>
            <div className="song-player">
                {showSongPlayer && (
                    <iframe
                        style={{ border: 12 }}
                        className="slide-in"
                        src={`https://open.spotify.com/embed/track/${id}`}
                        width="100%"
                        height="300px"
                        frameBorder="0"
                        allowfullscreen=""
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                    ></iframe>
                )}
            </div>
        </div>
    );
};
export default Posts;
