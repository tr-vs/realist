import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

const TimeStamp = () => {
    const [time, setTime] = useState();
    const { user } = useAuthContext();

    const getTimestamp = async () => {
        const response = await fetch(
            process.env.REACT_APP_BACKEND + 'api/main/timestamp',
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${user.idToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const json = await response.json();

        if (response.ok) {
            const options = {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true, // Use 12-hour clock with "am/pm"
            };

            const timeDate = new Date(json.updatedAt);
            const timeString = timeDate.toLocaleTimeString('en-US', options);

            setTime(timeString);
        }
    };

    useEffect(() => {
        getTimestamp();
    }, []);

    return <h4 className="page-title-time">Last Realist: {time}</h4>;
};

export default TimeStamp;
