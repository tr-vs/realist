import Magnify from "../svg/Magnify"
import CancelButton from "../svg/CancelButton";
import { Link } from "react-router-dom";
import '../styles/NavbarStyles.css';
import { useState } from "react";


const ProfileNavbar = () => {
    const [searchBar, setSearchBar] = useState(false);

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
                            <input
                                
                                className="search-bar"
                                type="text"
                                name=""
                                id=""
                                placeholder="Search..."
                            />
                            <CancelButton onClick={closeSearchClick} />
                        </div>
                    )}               
                </div>
            </div>
        </>
    )
}

export default ProfileNavbar