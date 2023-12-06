import '../styles/LandingPage.css';
import CancelButton from '../svg/CancelButton';
import Footer from '../templates/Footer';
import { register } from 'swiper/element/bundle';
import { Link as ScrollLink } from 'react-scroll';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckUsername } from '../hooks/useCheckUsername';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

register();

const Landing = () => {
    const [isPopUp, setIsPopUp] = useState(false);
    const { checkUsername, error, isLoading } = useCheckUsername();
    const navigate = useNavigate();
    const [inputText, setInputText] = useState('');
    const { user } = useAuthContext();

    const openPopUp = () => {
        setIsPopUp(true);
        document.body.style.overflow = 'hidden';
    };

    const closePopUp = () => {
        setIsPopUp(false);
        document.body.style.overflow = 'auto';
    };

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const check = async () => {
        if (user && user.idToken !== 'false') {
            navigate('/');
        } else {
            await checkUsername(inputText);
        }
    };

    useEffect(() => {
        if (!error && isLoading === false) {
            console.log('asdf');
            navigate('/signup');
        }
    }, [error, isLoading, navigate]);

    return (
        <>
            <div className="landing-container">
                <div>
                    <div className="site-name">
                        <h1>ReaList</h1>
                    </div>
                </div>
                <ScrollLink
                    to="info-section"
                    smooth={true}
                    duration={1000}
                    className="arrow"
                ></ScrollLink>
            </div>
            <div id="info-section">
                <div className="info-container">
                    <div className="album-covers">
                        <div className="album-cover-container1">
                            <img
                                className="album-cover1"
                                src="https://a5.mzstatic.com/us/r1000/0/Music126/v4/09/7d/b0/097db06f-8403-3cf7-7510-139e570ca66b/196871341882.jpg"
                                alt="Utopia Cover"
                            />
                            <img
                                className="album-cover2"
                                src="https://a5.mzstatic.com/us/r1000/0/Music115/v4/3c/1b/a9/3c1ba9e1-15b1-03b3-3bfd-09dbd9f1705b/dj.mggvbaou.jpg"
                                alt="PinkFloyd Cover"
                            />
                            <img
                                className="album-cover3"
                                src="https://a5.mzstatic.com/us/r1000/0/Music122/v4/f9/58/95/f95895f4-0ef6-a636-241e-ba4824ef6621/17UMGIM08349.rgb.jpg"
                                alt="Carti Cover"
                            />
                            <img
                                className="album-cover4"
                                src="https://a5.mzstatic.com/us/r1000/0/Music115/v4/9d/cc/90/9dcc90ae-5894-b83d-7fc3-691937cb60ee/13UAAIM43143.rgb.jpg"
                                alt="Magna Carta Cover"
                            />
                            <img
                                className="album-cover5"
                                src="https://a5.mzstatic.com/us/r1000/0/Music112/v4/86/c9/bb/86c9bb30-fe3d-442e-33c1-c106c4d23705/17UMGIM88776.rgb.jpg"
                                alt="Damn Cover"
                            />
                            <img
                                className="album-cover6"
                                src="https://a5.mzstatic.com/us/r1000/0/Music115/v4/b5/80/dc/b580dca0-349d-036b-e09b-bd849f6affd8/20UMGIM64216.rgb.jpg"
                                alt="Taylor Cover"
                            />
                            <img
                                className="album-cover7"
                                src="https://a5.mzstatic.com/us/r1000/0/Music116/v4/07/60/ba/0760ba0f-148c-b18f-d0ff-169ee96f3af5/634904078164.png"
                                alt="Radiohead Cover"
                            />
                            <img
                                className="album-cover8"
                                src="https://a5.mzstatic.com/us/r1000/0/Music115/v4/bb/45/68/bb4568f3-68cd-619d-fbcb-4e179916545d/BlondCover-Final.jpg"
                                alt="Blonde Cover"
                            />
                            <img
                                className="album-cover9"
                                src="https://a5.mzstatic.com/us/r1000/0/Music115/v4/49/ab/fe/49abfef6-0cd9-aa1f-05c3-3eb85d3fe3f5/886445635843.jpg"
                                alt="Pink Cover"
                            />
                            <img
                                className="album-cover10"
                                src="https://a5.mzstatic.com/us/r1000/0/Music124/v4/4e/d5/19/4ed519ca-3f8b-65ee-eb21-89d5c6a0b44e/00602547140265.rgb.jpg"
                                alt="The Who Cover"
                            />
                            <img
                                className="album-cover11"
                                src="https://a5.mzstatic.com/us/r1000/0/Music122/v4/bd/3b/a9/bd3ba9fb-9609-144f-bcfe-ead67b5f6ab3/196589564931.jpg"
                                alt="Sza Cover"
                            />
                        </div>
                    </div>
                    <div className="text-containers">
                        <div className="text-content">
                            <h1>share your songs</h1>
                        </div>
                        <div className="text-content">
                            <h1>discover new music</h1>
                        </div>
                        <div className="text-content">
                            <h1>expand your taste</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div id="bottom-section">
                <h1>Play your favorites</h1>
                <swiper-container loop="true" navigation="true">
                    <swiper-slide>
                        {
                            <iframe
                                style={{ border: 12 }}
                                src="https://open.spotify.com/embed/track/42VsgItocQwOQC3XWZ8JNA?utm_source=generator"
                                width="80%"
                                height="60%"
                                frameBorder="0"
                                allowfullscreen=""
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                            ></iframe>
                        }
                    </swiper-slide>
                    <swiper-slide>
                        {
                            <iframe
                                style={{ border: 12 }}
                                src="https://open.spotify.com/embed/track/3qiyyUfYe7CRYLucrPmulD?utm_source=generator"
                                width="80%"
                                height="60%"
                                frameBorder="0"
                                allowfullscreen=""
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                            ></iframe>
                        }
                    </swiper-slide>
                    <swiper-slide>
                        {
                            <iframe
                                style={{ border: 12 }}
                                src="https://open.spotify.com/embed/track/2ctvdKmETyOzPb2GiJJT53?utm_source=generator"
                                width="80%"
                                height="60%"
                                frameBorder="0"
                                allowfullscreen=""
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                            ></iframe>
                        }
                    </swiper-slide>
                    <swiper-slide>
                        {
                            <iframe
                                style={{ border: 12 }}
                                src="https://open.spotify.com/embed/track/37jTPJgwCCmIGMPB45jrPV?utm_source=generator"
                                width="80%"
                                height="60%"
                                frameBorder="0"
                                allowfullscreen=""
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                            ></iframe>
                        }
                    </swiper-slide>
                    <swiper-slide>
                        {
                            <iframe
                                style={{ border: 12 }}
                                src="https://open.spotify.com/embed/track/5wG3HvLhF6Y5KTGlK0IW3J?utm_source=generator"
                                width="80%"
                                height="60%"
                                frameBorder="0"
                                allowfullscreen=""
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                            ></iframe>
                        }
                    </swiper-slide>
                    <swiper-slide>
                        {
                            <iframe
                                style={{ border: 12 }}
                                src="https://open.spotify.com/embed/track/4iYRa2btalAzPZoSYfROqF?utm_source=generator"
                                width="80%"
                                height="60%"
                                frameBorder="0"
                                allowfullscreen=""
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                            ></iframe>
                        }
                    </swiper-slide>
                    <swiper-slide>
                        {
                            <iframe
                                style={{ border: 12 }}
                                src="https://open.spotify.com/embed/track/4iZ4pt7kvcaH6Yo8UoZ4s2?utm_source=generator"
                                width="80%"
                                height="60%"
                                frameBorder="0"
                                allowfullscreen=""
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                            ></iframe>
                        }
                    </swiper-slide>
                    <swiper-slide>
                        {
                            <iframe
                                style={{ border: 12 }}
                                src="https://open.spotify.com/embed/track/3hUxzQpSfdDqwM3ZTFQY0K?utm_source=generator"
                                width="80%"
                                height="60%"
                                frameBorder="0"
                                allowfullscreen=""
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                            ></iframe>
                        }
                    </swiper-slide>
                    <swiper-slide>
                        {
                            <iframe
                                style={{ border: 12 }}
                                src="https://open.spotify.com/embed/track/63OQupATfueTdZMWTxW03A?utm_source=generator"
                                width="80%"
                                height="60%"
                                frameBorder="0"
                                allowfullscreen=""
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                            ></iframe>
                        }
                    </swiper-slide>
                    <swiper-slide>
                        {
                            <iframe
                                style={{ border: 12 }}
                                src="https://open.spotify.com/embed/track/2LMkwUfqC6S6s6qDVlEuzV?utm_source=generator"
                                width="80%"
                                height="60%"
                                frameBorder="0"
                                allowfullscreen=""
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                            ></iframe>
                        }
                    </swiper-slide>
                </swiper-container>
                <div className="button-holder">
                    <p
                        onClick={openPopUp}
                        href="/signup"
                        className="button-text"
                    >
                        Get Started
                    </p>
                </div>
            </div>

            {isPopUp && (
                <div className="sign-up-popup">
                    <div className="sign-up-container">
                        <div className="close-button-container">
                            <CancelButton
                                className="close-button"
                                onClick={closePopUp}
                            />
                        </div>
                        <h1 className="modal-text top">Enter a username</h1>
                        <input
                            className="username-field"
                            type="text"
                            placeholder="your username"
                            onChange={handleInputChange}
                        />
                        {error && <div className="error">{error}</div>}
                        <div className="bottom-container">
                            <h3 className="modal-text bottom" onClick={check}>
                                Sign Up
                            </h3>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <Link
                                    to="/login"
                                    className="modal-link"
                                    style={{ marginLeft: '90px' }}
                                >
                                    <h3 className="modal-text bottom">
                                        Already have an account? Sign In
                                    </h3>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </>
    );
};
export default Landing;
