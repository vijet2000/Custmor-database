const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');

const connectDB = require('./server/database/connection.js');

const app = express();

dotenv.config({path:'config.env'});
const PORT = process.env.PORT || 8080

//log request
app.use(morgan('tiny'));

//mongodb connection
connectDB();

//parse request to body parser present the body-parser is present in express module
app.use(express.urlencoded({ extended:true }))

//set the view engine
app.set('view engine', 'ejs')
// app.set('views', path.resolve(__dirname, 'views/ejs') ) ////if you are using ejs file in the ejs folder present in views

//load assets or public files or client-side files
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));
//load router file to use
app.use('/', require('./server/routes/router.js'))

app.listen(PORT, () => {
    console.log(`The server started on http://localhost:${PORT}`);
})