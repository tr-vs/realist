require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const spotifyRoutes = require('./routes/spotify');
const mainRoutes = require('./routes/main');
const { updateNowPlaying, updateRecommended } = require('./services/home');

const cookieParser = require('cookie-parser');
const cors = require('cors');
const Time = require('./models/timeModel');

// express app
const app = express();

// middleware
app.use(express.json()).use(cookieParser());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// cors requirements
const corsOptions = {
    origin: process.env.FRONTEND, // Replace with your frontend's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

app.use(cors(corsOptions));

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

            const hours = [...Array(3).keys()].concat(
                Array.from({ length: 16 }, (_, index) => 8 + index)
            );

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

            updateRecommended();
            updateNowPlaying();
            await nextDate.save();
        }
        checkTime();
    }, 6e5);
};

checkTime();
