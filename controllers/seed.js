const bikes = require("../data/bikes");
const Bike = require("../models/bike");

async function seedData(req, res) {
    try {
        console.log("Bikes data:", bikes);
        await Bike.insertMany(bikes);
        res.status(201).send('Bikes seeded successfully')
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error seeding bikes')
    }
}
module.exports = { seedData }