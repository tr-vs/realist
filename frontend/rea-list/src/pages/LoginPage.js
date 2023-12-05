import { useAuthContext } from '../hooks/useAuthContext';
import { useEffect, useRef } from 'react';
import '@passageidentity/passage-elements/passage-login';
import '../styles/LoginPage.css';
import SignIn from '../templates/SignIn';

const SignInPage = () => {
    return (
        <div className="full-container">
            <SignIn />
        </div>
    );
};

export default SignInPage;
