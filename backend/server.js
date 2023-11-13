require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const spotifyRoutes = require('./routes/spotify');
const mainRoutes = require('./routes/main');
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

// Set middleware of CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://your-frontend.com');
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
