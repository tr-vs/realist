import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SignUpPage from './pages/SignUpPage';
import SignUp from './templates/SignUp';
import LoginPage from './pages/LoginPage';
import { useAuthContext } from './hooks/useAuthContext';
import { useState } from 'react';

function App() {
    const { user } = useAuthContext();

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={user ? <Home /> : <Navigate to="/login" />}
                    exact
                />
                <Route
                    path="/profile"
                    element={user ? <Profile /> : <Navigate to="/login" />}
                />
                <Route
                    path="/signup"
                    element={!user ? <SignUpPage /> : <Navigate to="/" />}
                />
                <Route
                    path="/login"
                    element={!user ? <LoginPage /> : <Navigate to="/" />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
//fun
