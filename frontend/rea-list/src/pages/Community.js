import Posts from "../templates/Posts"
import '../styles/FriendsPage.css'

const Community = () => {
    return (
        <div className="post-contents">
            <h1>Community Music</h1>
            <Posts num = {1}></Posts>
            <Posts num = {2}></Posts>
        </div>
    )
}

export default Community