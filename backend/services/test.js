require('dotenv').config();

const Time = require('../models/timeModel');
const mongoose = require('mongoose');
mongoose
    .connect(
        'mongodb+srv://travis:JMxgVeyOw00Wn8V9@cs35lproj.thwxz2g.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp'
    )
    .then(() => {
        // listen for reqeusts
    })
    .catch((error) => {
        console.log(error);
    });
const bruh = async () => {
    const now = await new Time({
        nextPostDate: new Date(),
    });
    await now.save();
    console.log(now);
};

bruh();
