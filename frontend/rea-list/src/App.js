import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SignUpPage from './pages/SignUpPage';
import SignUp from './templates/SignUp';
import LoginPage from './pages/LoginPage';
import Landing from './pages/Landing';
import OtherProfile from './pages/OtherProfile';
import { useAuthContext } from './hooks/useAuthContext';
import { useEffect, useState } from 'react';
import UserNotFound from './pages/UserNotFound';

function App() {
    const { user } = useAuthContext();
    const [SignUpElement, setSignUpElement] = useState(null);

    useEffect(() => {
        if (!user) {
            setSignUpElement(<Navigate to="/landing" />);
        } else if (user.idToken === 'false') {
            setSignUpElement(<SignUpPage />);
        } else {
            setSignUpElement(<Navigate to="/" />);
        }
    }, [user]);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        user && user.idToken !== 'false' ? (
                            <Home />
                        ) : (
                            <Navigate to="/landing" />
                        )
                    }
                    exact
                />
                <Route
                    path="/profile"
                    element={
                        user && user.idToken !== 'false' ? (
                            <Profile />
                        ) : (
                            <Navigate to="/landing" />
                        )
                    }
                />

                <Route path="/signup" element={SignUpElement} />
                <Route
                    path="/login"
                    element={
                        !user || user.idToken == 'false' ? (
                            <LoginPage />
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />
                <Route path="/landing" element={<Landing />} />
                <Route
                    path="/:username"
                    element={
                        user && user.idToken !== 'false' ? (
                            <OtherProfile />
                        ) : (
                            <Navigate to="/landing" />
                        )
                    }
                />
                <Route path="/usernotfound" element={<UserNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
//fun
