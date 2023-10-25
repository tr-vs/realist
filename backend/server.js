require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const spotifyRoutes = require('./routes/spotify');

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
// update this to users
app.use('/api/users', userRoutes);
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
