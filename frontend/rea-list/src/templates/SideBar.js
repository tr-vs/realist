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
        <h1 className={isSidebarClicked ? 'Sidebar active' : 'Sidebar'}>Test</h1>
    );
};

export default SideBar;
