import '../styles/PostsStyles.css';
const Posts = (props) => {
    // props to pass:
    // Username
    // Song Name
    // Artist of Song
    const links = [
        'https://media.pitchfork.com/photos/5929c43cea9e61561daa80db/master/pass/a240bddc.jpg',
        'https://images.squarespace-cdn.com/content/v1/5e40c67d62402c0ce36a6bf0/1603566903470-375SZI5GD0F53P2LPGXR/Ef1eZcOX0AEmSs_.jpg',
        'https://www.billboard.com/wp-content/uploads/2022/05/bad-bunny-cover-art-2022-billboard-1240.jpg?w=1024',
    ];

    return (
        <div className="profile-content">
            <img className = 'cover-images' src={links[props.num]} alt="" />
            <div className="song-info">
                <h4>Username</h4>
                <h3>Song Name</h3>
                <h3>Artist:</h3>
                <h5>Reaction: </h5>
                {/* comment */}
            </div>
        </div>
    );
};
export default Posts;
