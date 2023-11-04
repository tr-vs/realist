import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SignUpPage from './pages/SignUpPage';
import SignUp from './templates/SignUp';
import LoginPage from './pages/LoginPage';



function App() {
  return (
    
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<SignUpPage/>} />
            <Route path="/login" element={<LoginPage/>} />

            
        </Routes>
      </BrowserRouter>
  );
}

export default App;
//fun
