require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const spotifyAuthRoutes = require('./routes/spotifyAuth');
const spotifyRoutes = require('./routes/spotify');
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
    origin: 'http://localhost:3001', // Replace with your frontend's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

app.use(cors(corsOptions));

// routes
// update this to users
app.use('/api/users', userRoutes);
app.use('/api/spotifyAuth', spotifyAuthRoutes);
app.use('/api/spotify', spotifyRoutes);

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
