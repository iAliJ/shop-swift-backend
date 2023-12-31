const express = require('express');
require('dotenv').config()

// connect to mongoDB
const db = require('./config/db')

// initialize express app
const app = express();

//  Middlewares
app.use(express.json());

// link you static folder i.e. images, css 
app.use(express.static('public'));

// Routes
const authRoute = require('./routes/auth');
const storeRoute = require('./routes/store');
const productRoute = require('./routes/product');
const userRoute = require('./routes/user');
const categoryRoute = require('./routes/category');

app.use('/auth', authRoute);
app.use('/store', storeRoute);
app.use('/product', productRoute);
app.use('/user', userRoute);
app.use('/category', categoryRoute);

// start listening to requests coming from the PORT
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`))
