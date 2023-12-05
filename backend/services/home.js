require('dotenv').config({ path: '../.env' });

const User = require('../models/userModel');
const Playlist = require('../models/playlistModel');

const {
    getTop,
    getNowPlaying,
    recommendThreeTracks,
    createPlaylist,
} = require('./spotify');

const updateNowPlaying = async () => {
    const users = await User.find({
        access_token: { $exists: true },
    });
    for (const user of users) {
        let nowPlaying = await getNowPlaying(
            user.access_token,
            user.refresh_token
        );

        if (
            nowPlaying === undefined ||
            (nowPlaying.track === undefined &&
                nowPlaying.currently_playing_type !== 'track')
        ) {
            console.log(user.username);
            continue;
        }

        user.nowPlaying = JSON.stringify(nowPlaying);

        await user.save();
    }
};

const updateRecommended = async () => {
    const users = await User.find({
        access_token: { $exists: true },
    });
    for (const user of users) {
        const { access_token, refresh_token } = user;

        const topFive = await getTop(
            access_token,
            refresh_token,
            'tracks',
            5,
            'short_term'
        );

        if (topFive === undefined) continue;

        const artistIds = topFive.items
            .slice(3, 5)
            .map((item) => item.artists[0].id)
            .join('&3C');

        if (artistIds.length === 0) continue;

        const trackIds = topFive.items
            .slice(0, 3)
            .map((item) => item.id)
            .join('&3C');

        const threeRec = await recommendThreeTracks(
            access_token,
            refresh_token,
            artistIds,
            trackIds
        );

        const threeRecID = threeRec.map((rec) => rec.id);

        user.recommended = threeRecID;
        await user.save();
    }
};

const generatePlaylists = async () => {
    const realist = await User.findOne({ username: 'realist' });
    const { access_token, refresh_token } = realist;

    const users = await User.find(
        {
            nowPlaying: { $exists: true },
        },
        'nowPlaying school'
    );

    const myDate = new Date();
    const year = myDate.getFullYear();
    const month = myDate.getMonth() + 1;
    const day = myDate.getDate();

    let schoolToUsers = users.reduce((accumulator, user) => {
        const school = user.school;
        if (!accumulator[school]) accumulator[school] = [];
        let songID;
        const nowPlaying = JSON.parse(user.nowPlaying);
        if (nowPlaying?.item) {
            songID = `spotify:track:${nowPlaying.item.id}`;
        } else if (nowPlaying?.track) {
            songID = `spotify:track:${nowPlaying.track.id}`;
        }
        accumulator[school].push(songID);
        return accumulator;
    }, {});
    for (const [school, IDs] of Object.entries(schoolToUsers)) {
        const playlistID = await createPlaylist(
            access_token,
            refresh_token,
            `${school}'s realist - ${month}/${day}/${year}`,
            IDs
        );

        if (playlistID !== 'failed') {
            const playlist = await Playlist.findOneAndUpdate(
                { school },
                { playlistID },
                { upsert: true }
            );
        }
    }
};

module.exports = {
    updateNowPlaying,
    updateRecommended,
    generatePlaylists,
};
