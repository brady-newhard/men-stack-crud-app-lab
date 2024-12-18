const Bike = require('../models/bike')


// Fetch all data
async function index(req, res) {
    if (req.session.user) {
        try {
          const bikes = await Bike.find(); // Fetch bikes from the database
          res.render('bikes', { title: 'Bike List', bikes });
        } catch (error) {
          console.error('Error fetching bikes:', error.message);
          res.status(500).send('Internal server error');
        }
      } else {
        res.send("Sorry, no guests allowed.");
      }
};

//     try {
//         const bikes = await Bike.find({})
//         res.render('bikes', { title: 'Bike List', bikes })
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send('Internal server error');
//     }
// }

// Open a New Bike Form
function newBike(req, res) {
    res.render('bikes/new', { title: 'New Bike' })   
}

//postBike
async function postBike(req, res) {
    try {
        const { brand = "brand", model = "model", year = "year", type = "type" } = req.body;
        const newBike = new Bike({
            brand: brand,
            model: model,
            year: year,
            type: type 
        })
        await newBike.save()
        res.status(201).redirect('/bikes')
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error')
    }
}
//showBike
async function showBike(req, res) {
    try {
        const bike = await Bike.findById(req.params.id);
        if (bike) {
            res.render('bikes/show', { title: 'Bike Details', bike })
        } else {
            res.status(404).render('404/notFound', { title: "Bike not found" })
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error')
    }
}
//editBike
async function editBike(req, res) {
    const bike = await Bike.findById(req.params.id);
    try {
        if (bike) {
            res.render('bikes/edit', { title: 'Edit Bike', bike });
        } else {
            res.status(404).render('404/notFound', { title: 'Bike Not Found!' })
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error')
    }
}
//updateBike
async function updateBike(req, res) {
    try {
        const bikeId = req.params.id;
        const { id } = req.params;
        const updatedBike = await Bike.findByIdAndUpdate(id, req.body)
            if (updatedBike) {
                res.status(200).redirect("/bikes")
            } else {
                res.status(404).render('404/notFound', { title: 'Bike Not Found' })
            }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error')
    }
}

//deleteBike
async function deleteBike(req, res) {
    try {
        const { id } = req.params;
        const deletedBike = await Bike.findByIdAndDelete(id, req.body)
        if (deletedBike) {
            res.status(200).redirect("/bikes")
        } else {
            res.status(404).render('404/notFound', { title: 'Bike Not Found' })
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error')
    }
}

module.exports = { index, newBike, postBike, showBike, editBike, updateBike, deleteBike }