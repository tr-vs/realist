import Posts from '../templates/Posts';
import '../styles/FriendsPage.css';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

const Friends = () => {
    const { user } = useAuthContext();
    const [followingPosts, setFollowingPosts] = useState([]);

    const fetchFollowingData = async () => {
        const response = await fetch(
            process.env.REACT_APP_BACKEND + 'api/main/following',
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${user.idToken}`,
                    'Content-Type': 'application/json',
                },
            }
        ).then((r) => r.json());

        const posts = response.map((post) => {
            return <Posts data={post}></Posts>;
        });

        setFollowingPosts(posts);
    };

    useEffect(() => {
        fetchFollowingData();
    }, []);

    return (
        <div className="post-contents">
            <h4 className='page-title-time'>Last ReaList: 2:45pm</h4>
            <h1 className="page-title">Following's Music</h1>
            {followingPosts}
        </div>
    );
};

export default Friends;
