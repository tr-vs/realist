import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useCheckUsername = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const checkUsername = async (inputText) => {
        setIsLoading(true);
        setError(null);
        const lower = inputText.toLowerCase();

        if (
            ['login', 'signup', 'landing', 'profile', 'usernotfound'].includes(
                lower
            ) ||
            lower.length === 0 ||
            lower.length > 25
        ) {
            setError('Username is prohibited!');
            setIsLoading(false);
        } else {
            const response = await fetch(
                process.env.REACT_APP_BACKEND +
                    'api/users/usernameValidation/' +
                    inputText,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (response.ok) {
                const json = await response.json();

                localStorage.setItem('user', JSON.stringify(json));

                dispatch({ type: 'LOGIN', payload: json });
                setIsLoading(false);
            } else {
                setError('Username already taken!');
                setIsLoading(false);
            }
        }
    };

    return { checkUsername, isLoading, error };
};
