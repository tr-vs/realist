import { useEffect, useState } from 'react';
import Color from 'color-thief-react';
import '../styles/PostsStyles.css';
const Posts = (props) => {
    // props to pass:
    // Username
    // Song Name
    // Artist of Song

    const [predominantColor, setPredominantColor] = useState('');

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
    if (props.data !== undefined) {
        nowPlaying = JSON.parse(props.data.nowPlaying);
        // console.log(nowPlaying);
        // console.log(nowPlaying.is_playing);
        if (nowPlaying.is_playing === true) {
            cover = nowPlaying.item.album.images[1].url;
            song = nowPlaying.item.name;
            const artists = nowPlaying.item.artists.map(
                (artist) => artist.name
            );
            artist = artists.join(', ');
        } else {
            cover = nowPlaying.track.album.images[1].url;
            song = nowPlaying.track.name;
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
            <img id={song} className="cover-images" src={cover} alt="" 
                onMouseOver={() => {
                    document.getElementById(song).style.transform = 'translate(12px, 12px)';
                    document.getElementById(song).style.boxShadow = `0 0 0px 0px ${predominantColor}`;
                  }}
                onMouseOut={() => {
                    document.getElementById(song).style.transform = 'translate(0px, 0px)';
                    document.getElementById(song).style.boxShadow = `12px 12px 20px 3px ${predominantColor}`;
                }}
                
            />
            <div className="song-info">
                <h4>{username}</h4>
                <h3>{song}</h3>
                <h3>{artist}</h3>
                <h5>Reaction: </h5>
                {/* comment */}
                
            </div>
        </div>
    );
};
export default Posts;
