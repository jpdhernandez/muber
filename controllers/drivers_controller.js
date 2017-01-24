const Driver = require('../models/driver');

module.exports = {
    greeting(req, res) {
        res.send({ hi: 'there' });
    },

    create(req, res, next) {
        const driverProps = req.body;

        Driver.create(driverProps)
            .then(driver => res.send(driver))
            .catch(next);
    },

    edit(req, res, next) {
        const driverId = req.params.id; // grab url
        const driverProps = req.body; // grab available attribs

        Driver.findByIdAndUpdate({ _id: driverId }, driverProps)
            .then(() => Driver.findById({ _id: driverId }))
            .then(driver => res.send(driver)) // send back the updated driver
            .catch(next); // go to error handling middleware 
    }
}