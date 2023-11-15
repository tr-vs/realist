import Posts from '../templates/Posts';
import '../styles/FriendsPage.css';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

const Community = () => {
    const { user } = useAuthContext();
    const [communityPostData, setCommunityPostData] = useState([]);
    const [fetched, setFetched] = useState(false);
    const [communityPosts, setCommunityPosts] = useState([]);

    const fetchCommunityPostData = async () => {
        const response = await fetch(
            'https://realist.onrender.com/api/main/community',
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

        setCommunityPosts(posts);
        setFetched(true);
    };

    useEffect(() => {
        if (!fetched) {
            fetchCommunityPostData();
        }
    });

    return (
        <div className="post-contents">
            <h1 className="page-title">Community Music</h1>
            {communityPosts}
        </div>
    );
};

export default Community;
