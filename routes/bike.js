const router = require('express').Router();
const bikeCtrl = require('../controllers/bike');

router.get('/bikes', bikeCtrl.index);
router.get('/bikes/new', bikeCtrl.newBike);
router.post('/bikes', bikeCtrl.postBike);
router.get('/bikes/:id', bikeCtrl.showBike);
router.get('/bikes/:id/edit', bikeCtrl.editBike);
router.put('/bikes/:id', bikeCtrl.updateBike);
router.delete('/bikes/:id', bikeCtrl.deleteBike);

module.exports = router;