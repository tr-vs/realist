import Magnify from "../svg/Magnify"
import CancelButton from "../svg/CancelButton";
import UsernameHolder from "./UsernameHolder";
import { Link } from "react-router-dom";
import '../styles/NavbarStyles.css';
import { useState, useRef } from "react";


const ProfileNavbar = () => {
    const [searchBar, setSearchBar] = useState(false);
    const [searchInput, setSearchInput] = useState([]); 
    const inputRef = useRef(null);


    const sampleUsernames = ['kesdlvi', 'chasin_jasonnn', "gaby", "jacque", "travis", "brianna", "ssedric", "soupy", "jasibermejo", "teresalee"]

    const handleSearchClick = () => {
        if (!searchBar) {
            setSearchBar(true);
        }
    };

    const closeSearchClick = () => {
        if (searchBar) {

            setSearchBar(false);  
        }
    };

    const handleSearchInputChange = (event) => {
        const currentInput = event.target.value.toLowerCase(); 

        // Filter searches by character
        const filteredUsernames = sampleUsernames.filter((username) =>
            username.toLowerCase().includes(currentInput)
        );

        setSearchInput(filteredUsernames);
        if (event.target.value == '') setSearchInput([])
    }

    

    return (
        <>
            <div className="navbar">
                <div className="profile-navbar">
                    <Link to={"/"}>
                        <h1 className="logo-name">ReaList</h1>
                    </Link>
                </div>
                <div className="right-side">
                    <Magnify className="search-image" onClick={handleSearchClick} />
                    {searchBar && (
                        <div className="search-bar-container">
                            <div className='search-bar-and-menu-container'>
                                <input
                                    ref={inputRef}
                                    className="search-bar"
                                    type="text"
                                    name=""
                                    id=""
                                    placeholder="Search..."
                                    onChange={handleSearchInputChange}
                                />
                                {searchInput.length > 0 && (
                                    <div className='search-results'> 
                                        {searchInput.map((user) => (
                                            <UsernameHolder username={user}/>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <CancelButton onClick={closeSearchClick} />
                        </div>
                    )}               
                </div>
            </div>
        </>
    )
}

export default ProfileNavbar