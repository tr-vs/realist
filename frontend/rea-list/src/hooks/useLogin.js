import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (data) => {
        setIsLoading(true);
        setError(null);

        const jsonPayload = JSON.stringify({
            email: data.get('email'),
            password: data.get('password'),
        });

        // post to db
        const response = await fetch(
            'https://realist.onrender.com/api/users/login',
            {
                method: 'POST',
                credentials: 'include',
                body: jsonPayload,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        const json = await response.json();
        console.log('hiiiiiiii');
        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        }
        if (response.ok) {
            console.log('asdfasfsa');
            // save user to local storage
            localStorage.setItem('user', JSON.stringify(json));
            // update the auth context
            dispatch({ type: 'LOGIN', payload: json });

            setIsLoading(false);
        }
    };

    return { login, isLoading, error };
};
