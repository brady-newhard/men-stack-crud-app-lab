const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const bikes = require("./data/bikes");
const mongoose = require('mongoose');
const path = require("path")
const Bike = require("./model/bike");
const methodOverride = require("method-override");

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
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride("_method"))

// -------------------------------CRUD/INDUCE------------------------------//

// Home Index
app.get("/", (req, res) => {
    res.render("home")
})

// Bikes Index 
app.get("/bikes", (req, res) => {
    res.render("bikes", {title: "My Bikes", bikes })
})

// New
app.get('/bikes/new', (req, res) => {
    res.render('bikes/new', { title: 'New Bike' })
});

// Post & Create
app.post('/bikes', (req, res) => {
    const newBike = {
        id: bikes.length + 1,
        brand: req.body.brand || "Brand of Bike",
        model: req.body.model || "Model of Bike",
        year: req.body.year || "Model Year",
        type: req.body.type || "Discipline"
    }
    bikes.push(newBike);
    res.status(201).redirect('/bikes')
})

// Show
app.get('/bikes/:id', (req, res) => {
    const bike = bikes.find(bike => bike.id === parseInt(req.params.id));
    if (bike) {
        res.render('bikes/show', { title: 'Bike Details', bike })
    } else {
        res.status(404).render('404/notFound', { title: "Bike not found" })
    }
})

app.get('/bikes/:id/edit', (req, res) => {
    const bike = bikes.find(bike => bike.id === parseInt(req.params.id));
    if (bike) {
        res.render('bikes/edit', { title: 'Edit Bike', bike });
    } else {
        res.status(404).render('404/notFound', { title: 'Bike Not Found!' })
    }
})

// Edit
app.put("/bikes/:id", (req, res) => {
    const bikeId = parseInt(req,params.id);
    const bikeInde = bikes.findIndex(bike => bike.id === bikeId);
    if (bikeIndex !== -1) {
        bikes[bikeIndex] = { ...bikes[bikeIndex], ...req.body}
        res.status(200).redirect(`/bikes`)
    } else {
        res.status(404).render('404/notFound', { title: 'Bike Not Found' })
    } 
})

// Delete
app.delete('/bikes/:id', (req, res) => {
    const bikeId = parseInt(req.params.id);
    const bikeIndex = bikes.findIndex(bike => bike.id === bikeId);
    if (bikeIndex !== -1) {
        bikes.splice(bikeIndex, 1);
        
    } else {
        res.status(404).render('404/notFound', { title: 'Bike Not Found' });
    }
    res.redirect('/bikes'); 
});

//------------------------------Listener-----------------------------------//

app.listen(process.env.PORT, () => {
    console.log(`🎧Listening on http://localhost:${process.env.PORT}`);
})





