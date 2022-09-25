const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const studentsRoute = require('./routes/student')

// Environment
dotenv.config();
const PORT = process.env.PORT || 4000

// init  Express
const app = express();

// Data Manage 
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

// Ejs Init 
app.set("view engine", "ejs")
app.use(expressLayouts);
app.set("layout", "layouts/layout")

// Static File
app.use(express.static('public'));

// Routes
app.use('/students', studentsRoute);

// Server
app.listen(PORT, () => {
    console.log(`Your Server is Running On PORT ${ PORT }`.green);
});