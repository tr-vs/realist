import { useAuthContext } from '../hooks/useAuthContext';
import { useEffect, useRef } from 'react';
import '@passageidentity/passage-elements/passage-register';

const SignUpPage = () => {
    const ref = useRef();
    const { dispatch, user } = useAuthContext();

    const onSuccess = async (authResult) => {
        const response = await fetch(
            process.env.REACT_APP_BACKEND + 'api/users/signup',
            {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({ username: user.username }),
                headers: {
                    Authorization: `Bearer ${authResult.auth_token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        const json = await response.json();

        if (response.ok) {
            // save user to local storage
            localStorage.setItem('user', JSON.stringify(json));

            // update the auth context
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
            <passage-register
                ref={ref}
                onSuccess={onSuccess}
                app-id={process.env.REACT_APP_PASSAGE_APP_ID}
            ></passage-register>
        </div>
    );
};

export default SignUpPage;
