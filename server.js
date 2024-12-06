const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const bikes = require("./data/bikes");
const mongoose = require('mongoose');

//--------------CONFIGURE MONGOOSE----------------------//

mongoose.connect(process.env.MONGODB_URI, {
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
})

//-------------------MIDDLEWARE-------------------------//

app.use(morgan('dev'));
app.set('view engine', 'ejs');


// ---------------------CRUD/INDUCE---------------------//

// Index
app.get("/", (req, res) => {
    res.render("home")
})

// Index
app.get("/bikes", (req, res) => {
    res.render("bikes", {title: "My Bikes", bikes })
})

//---------------------Listener-------------------------//

app.listen(process.env.PORT, () => {
    console.log(`🎧Listening on http://localhost:${process.env.PORT}`);
})