import '../styles/FollowingPopup.css';
import CancelButton from '../svg/CancelButton';
import UsernameHolder from './UsernameHolder';
import { useState } from 'react';
const FollowingPopup = ({follow, onClick}) => {
    console.log("following people ", follow)


    return ( 
        <>
            <div className='following-popup-container'>
                <div className="following-popup">
                    <div className='user-and-button-container'>
                        <div className='button-container'>
                            <CancelButton onClick={onClick}/>
                        </div>
                        <div className='user-container'>
                            {follow.map((user) => (
                            <UsernameHolder
                                username={user}
                            />
                            ))}
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    );
}

export default FollowingPopup