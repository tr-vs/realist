import { PassageRegister } from '@passageidentity/passage-react';
import { useAuthContext } from '../hooks/useAuthContext';

const SignUpPage = () => {
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

    return (
        <div className="full-container">
            <PassageRegister onSuccess={onSuccess} />
        </div>
    );
};

export default SignUpPage;
