import '../styles/FollowingPopup.css';
import CancelButton from '../svg/CancelButton';
const FollowingPopup = ({onClick}) => {

    return ( 
        <>
            <div className='following-popup-container'>
                <div className="following-popup">
                    <CancelButton onClick={onClick}/>
                    
                </div>
            </div>
        </>
    );
}

export default FollowingPopup