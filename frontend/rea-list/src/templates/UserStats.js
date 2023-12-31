import '../styles/UserStats.css';
const UserStats = ({ error, songs, artists }) => {
    return (
        <div className={`stats-container ${error ? '' : 'centered'}`}>
            {error ? (
                <h2 className="no-spotify">{error}</h2>
            ) : (
                <>
                    <div className="user-top-artists">
                        <div className="titleTA">
                            <h2>Top Artists... </h2>
                        </div>
                        <div className=".user-top-artists">
                            <iframe
                                style={{ border: 12, height: 160 }}
                                src={`https://open.spotify.com/embed/artist/${artists[0]}`}
                                width="120%"
                                height="120%"
                                frameBorder="0"
                                allowfullscreen=""
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                            ></iframe>
                            <iframe
                                style={{ border: 12, height: 160 }}
                                src={`https://open.spotify.com/embed/artist/${artists[1]}`}
                                width="120%"
                                height="120%"
                                frameBorder="0"
                                allowfullscreen=""
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                            ></iframe>
                            <iframe
                                style={{ border: 12, height: 160 }}
                                src={`https://open.spotify.com/embed/artist/${artists[2]}`}
                                width="120%"
                                height="120%"
                                frameBorder="0"
                                allowfullscreen=""
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                    <div className="user-top-songs">
                        <div className="titleTS">
                            <h2>Top Songs...</h2>
                        </div>
                        <>
                            <iframe
                                style={{ border: 12, height: 88 }}
                                src={`https://open.spotify.com/embed/track/${songs[0]}`}
                                width="100%"
                                height="352"
                                frameBorder="0"
                                allowfullscreen=""
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                            ></iframe>
                            <iframe
                                style={{ border: 12, height: 88 }}
                                src={`https://open.spotify.com/embed/track/${songs[1]}`}
                                width="100%"
                                height="50%"
                                frameBorder="0"
                                allowfullscreen=""
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                            ></iframe>
                            <iframe
                                style={{ border: 12, height: 88 }}
                                src={`https://open.spotify.com/embed/track/${songs[2]}`}
                                width="100%"
                                height="50%"
                                frameBorder="0"
                                allowfullscreen=""
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                            ></iframe>
                            <iframe
                                style={{ border: 12, height: 88 }}
                                src={`https://open.spotify.com/embed/track/${songs[3]}`}
                                width="100%"
                                height="352"
                                frameBorder="0"
                                allowfullscreen=""
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                            ></iframe>
                            <iframe
                                style={{ border: 12, height: 88 }}
                                src={`https://open.spotify.com/embed/track/${songs[4]}`}
                                width="100%"
                                height="352"
                                frameBorder="0"
                                allowfullscreen=""
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                            ></iframe>
                        </>
                    </div>
                </>
            )}
        </div>
    );
};

export default UserStats;
