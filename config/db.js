const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_DB_URI)
.then(() => {
    console.log('MongoDB Connected dbd name: ' + mongoose.connection.name);
})
.catch((err) => {
    console.log('Connection failed, reason\n' + err);
})