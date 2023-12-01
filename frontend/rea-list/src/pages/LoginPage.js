import { useAuthContext } from '../hooks/useAuthContext';
import { useEffect, useRef } from 'react';
import '@passageidentity/passage-elements/passage-login';
import '../styles/LoginPage.css';

const SignInPage = () => {
    const ref = useRef();
    const { dispatch } = useAuthContext();

    const onSuccess = async (authResult) => {
        const response = await fetch(
            process.env.REACT_APP_BACKEND + 'api/users/login',
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${authResult.auth_token}`,
                },
            }
        );
        const json = await response.json();

        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(json));

            dispatch({ type: 'LOGIN', payload: json });
        }
    };

    useEffect(() => {
        const { current } = ref;
        current.onSuccess = onSuccess;
        return () => {};
    });

    return (
        <div className="full-container">
            <passage-login
                ref={ref}
                onSuccess={onSuccess}
                app-id={process.env.REACT_APP_PASSAGE_APP_ID}
            ></passage-login>
        </div>
    );
};

export default SignInPage;
