import SignIn from '../templates/SignIn';
import { PassageLogin } from '@passageidentity/passage-react';
import { useAuthContext } from '../hooks/useAuthContext';

const SignInPage = () => {
    const { dispatch } = useAuthContext();

    const onSuccess = async (authResult) => {
        const response = await fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${authResult.auth_token}`,
            },
        });
        const json = await response.json();

        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(json));

            dispatch({ type: 'LOGIN', payload: json });
        }
    };

    return (
        <div className="full-container">
            <PassageLogin onSuccess={onSuccess} />
        </div>
    );
};

export default SignInPage;
