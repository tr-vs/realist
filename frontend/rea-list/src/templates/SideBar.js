import '../styles/Sidebar.css';
import { useAuthContext } from '../hooks/useAuthContext';
import { useEffect, useState } from 'react';

const SideBar = ({isSidebarClicked}) => {
    // only load data if they are logged in
    const { user } = useAuthContext();
    const [error, setError] = useState(null);

    useEffect(() => {
        const getSideBar = async () => {
            // TODO: create sidebar route
            const response = await fetch('/api/sideBar', {
                headers: {
                    Authorization: `Bearer ${user.idToken}`,
                },
            });

            const json = await response.json();
        };

        if (user) getSideBar();
    });
    return (
        <div className={isSidebarClicked ? 'Sidebar active' : 'Sidebar'}>
            <img className='listening-album-cover' src="https://media.pitchfork.com/photos/64c3bee4a7c2659c4cdcf382/master/pass/Travis%20Scott%20-%20Utopia.jpeg" alt="" />
        
        
        </div>
    );
};

export default SideBar;
