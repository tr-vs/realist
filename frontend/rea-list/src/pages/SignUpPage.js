import SignUp from '../templates/SignUp';
import { PassageRegister } from '@passageidentity/passage-react';
import { useAuthContext } from '../hooks/useAuthContext';

const SignUpPage = () => {
    const { dispatch } = useAuthContext();

    const onSuccess = async (authResult) => {
        const response = await fetch('http://localhost:3000/api/users/signup', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${authResult.auth_token}`,
            },
        });
        const json = await response.json();

        if (response.status !== 200) {
            return false;
        }
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
