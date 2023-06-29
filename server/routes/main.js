const express = require('express');
const router = express.Router();

const adminController = require('../controller/admin');
const userController = require('../controller/user');
const flightController = require('../controller/flight');

router.get('/test', (req, res) => {
    res.send("API working");
});

//admin
router.post('/add_admin', adminController.createAdmin);
router.post('/admin_login', adminController.loginAdmin);

//user
router.post('/signup', userController.signupUser);
router.post('/login', userController.loginUser);

//flight
router.post('/createFlight', flightController.createFlight);
router.post('/removeFlight', flightController.removeFlight);
router.post('/viewFlights', flightController.viewFlights);

module.exports = router;