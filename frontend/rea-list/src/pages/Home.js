import '../styles/HomePage.css'
import Navbar from '../templates/Navbar'
import Friends from './Friends'
import Community from './Community'
import { useState } from 'react'

const Home = () => {
    const [isCommunityClicked, setIsCommunityClicked] = useState(false)
    const [isFriendsClicked, setIsFriendsClicked] = useState(true);

    return ( 
        
        <div className="full-page">
        
        <Navbar 
            isFriendsClicked={isFriendsClicked} 
            setIsFriendsClicked={setIsFriendsClicked}
            isCommunityClicked = {isCommunityClicked}
            setIsCommunityClicked = {setIsCommunityClicked}
        />
            
            {/* <-- Two pages for community and friends and statistics-> */}
            <div className='page-content'>
                {isFriendsClicked && <Friends></Friends>}
                {isCommunityClicked && <Community></Community>}
            </div>
            {/* <div className='sidebar'>
                <h2>SideBar will be here</h2>
            </div> */}

        </div>
    )
}

export default Home