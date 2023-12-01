import { PassageLogin, PassageTheme } from '@passageidentity/passage-react';
import { useAuthContext } from '../hooks/useAuthContext';
import '../styles/LoginPage.css';
import '@passageidentity/passage-elements/passage-login';

const SignInPage = () => {
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
    console.log(process.env.REACT_APP_PASSAGE_APP_ID);
    return (
        <div className="full-container">
            <passage-login
                onSuccess={onSuccess}
                app-id={process.env.REACT_APP_PASSAGE_APP_ID}
            ></passage-login>
        </div>
    );
};

export default SignInPage;
