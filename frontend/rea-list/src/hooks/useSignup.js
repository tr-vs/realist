import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async (data) => {
        setIsLoading(true);
        setError(null);

        const jsonPayload = JSON.stringify({
            email: data.get('email'),
            password: data.get('password'),
            school: data.get('school'),
            username: data.get('username'),
        });

        // post to db
        const response = await fetch('http://localhost:3000/api/users/signup', {
            method: 'POST',
            credentials: 'include',
            body: jsonPayload,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        }
        if (response.ok) {
            // save user to local storage
            localStorage.setItem('user', JSON.stringify(json));

            // update the auth context
            dispatch({ type: 'LOGIN', payload: json });

            setIsLoading(false);
        }
    };

    return { signup, isLoading, error };
};
