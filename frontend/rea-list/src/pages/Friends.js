import Posts from "../templates/Posts"
import '../styles/FriendsPage.css'

const Friends = () => {
    return (
        <div className="post-contents">
            {/* Map through all friends in database, pass values as props for post */}
            <h1 className='page-title'>Friend's Music</h1>
            <Posts num={0}></Posts>
            <Posts num={1}></Posts>
            <Posts num={2}></Posts>
            <Posts num={0}></Posts>
            <Posts num={1}></Posts>
            <Posts num={2}></Posts>
        </div>
    )
}

export default Friends