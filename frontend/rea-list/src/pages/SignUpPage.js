import { useAuthContext } from '../hooks/useAuthContext';
import { useEffect, useRef } from 'react';
import '@passageidentity/passage-elements/passage-register';
import SignUp from '../templates/SignUp';

const SignUpPage = () => {
    return (
        <div className="full-container">
            <SignUp />
        </div>
    );
};

export default SignUpPage;
