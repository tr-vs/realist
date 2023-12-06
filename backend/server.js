require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const spotifyRoutes = require('./routes/spotify');
const mainRoutes = require('./routes/main');
const {
    updateNowPlaying,
    updateRecommended,
    generatePlaylists,
} = require('./services/home');

const cookieParser = require('cookie-parser');
const cors = require('cors');
const Time = require('./models/timeModel');

const allowHeaders = [
    'Content-Type',
    'Authorization',
    'X-Content-Type-Options',
    'Accept',
    'X-Requested-With',
    'Origin',
    'Access-Control-Request-Method',
    'Access-Control-Request-Headers',
];
const allowMethods = [
    'GET',
    'HEAD',
    'PUT',
    'PATCH',
    'POST',
    'DELETE',
    'OPTIONS',
    'CONNECT',
    'TRACE',
];

// express app
const app = express();

// middleware
app.use(express.json()).use(cookieParser());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND);
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers'
    );
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Private-Network', true);
    //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
    res.setHeader('Access-Control-Max-Age', 7200);

    next();
});

app.options('*', (req, res) => {
    console.log('preflight');

    console.log(req.headers);
    if (
        req.headers.origin === process.env.FRONTEND
        // allowMethods.includes(req.headers['access-control-request-method']) &&
        // allowHeaders.includes(req.headers['access-control-request-headers'])
    ) {
        console.log('pass');
        return res.status(204).send();
    } else {
        console.log('fail');
    }
});

// routes
// update this to users
app.use('/api/users', userRoutes);
app.use('/api/spotify', spotifyRoutes);
app.use('/api/main', mainRoutes);

// connect to db
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        // listen for reqeusts
        app.listen(process.env.PORT, () => {
            console.log(
                'connected to db & listening on port',
                process.env.PORT
            );
        });
    })
    .catch((error) => {
        console.log(error);
    });

const checkTime = () => {
    setTimeout(async () => {
        //
        // updateNowPlaying();
        // updateRecommended();

        const nextDate = await Time.findOne({});
        const nowDate = new Date();

        if (nextDate.nextPostDate < nowDate) {
            const tomorrow = nowDate;
            tomorrow.setDate(tomorrow.getDate() + 1);

            const hours = Array.from({ length: 16 }, (_, index) => 8 + index);

            const randomHour = hours[Math.floor(Math.random() * hours.length)];
            const randomMinute = Math.floor(Math.random() * 60);
            const randomSecond = Math.floor(Math.random() * 60);

            const nextPostDate = new Date(
                tomorrow.getFullYear(),
                tomorrow.getMonth(),
                tomorrow.getDate(),
                randomHour,
                randomMinute,
                randomSecond
            );

            nextDate.nextPostDate = nextPostDate;

            await updateRecommended();
            await updateNowPlaying();
            await generatePlaylists();
            await nextDate.save();
        }
        checkTime();
    }, 6e5);
};

checkTime();
