require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const spotifyRoutes = require('./routes/spotify');
const mainRoutes = require('./routes/main');
const { updateNowPlaying } = require('./services/home');
const cookieParser = require('cookie-parser');
const cors = require('cors');

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

// const updateNowPlaying = async () => {
//     const currentDate = new Date();

//     const minHours = Math.ceil(12);
//     const maxHours = Math.floor(24);
//     const randomHours = Math.floor(Math.random() * (max - min) + min);
//     const randomMinutes = Math.floor(Math.random() * 60);
//     const randomSeconds = Math.floor(Math.random() * 60);

//     const nextExecutionTime = new Date(
//         currentDate.getFullYear(),
//         currentDate.getMonth(),
//         currentDate.getDate(),
//         randomHours,
//         randomMinutes,
//         randomSeconds
//     );

//     const timeUntilNextExecution = nextExecutionTime - currentDate;

//     setTimeout(() => {
//         console.log('works.');

//         updateNowPlaying();
//     }, timeUntilNextExecution);
// };

// updateNowPlaying();
updateNowPlaying();
