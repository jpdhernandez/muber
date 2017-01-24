const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');


const Driver = mongoose.model('driver');

describe('Drivers cotnroller', () => {
    it('Post to /api/drivers creates a new driver', (done) => {
        Driver.count().then((count) => {
            request(app)
                .post('/api/drivers')
                .send({ email: 'test@test.com' })
                .end(() => {
                    Driver.count().then((newCount) => {
                        assert(count + 1 === newCount)
                        done();
                    });
                });
        });
    });

    it('PUT to /api/drivers/id edits an existing driver', done => {
        // create the driver, edit the driver, pull out the driver that was updated
        const driver = new Driver({ email: 't@t.com', driving: false })

        // use supertest to make a PUT request
        driver.save().then(() => {
            request(app)
                .put(`/api/drivers/${driver._id}`)
                .send({ driving: true }) // send the update
                .end(() => {
                    Driver.findOne({ email: 't@t.com' })
                        .then(driver => {
                            assert(driver.driving === true);
                            done();
                        });
                })
        });
    });

});