
const Profile = () => {
    
    const openSpotify = () => {
        fetch('http://localhost:3000/api/spotify/auth')
            .then(response => {
                if(!response.ok) {
                    throw new Error("Not good")
                }
                return response.json();
            })
            
            
    }


    return ( 
        
        <button onClick={openSpotify}>Connect to Spotify</button>
    )
}

export default Profile