const Appointment = require('../models/model-appmng');

const addAppointments = (req, res, next) => {
    console.log('enter add section');
    const appointment = new Appointment({
        a_id: generateAppointmentId(),
        tests: req.body.tests,
    });
    appointment.save()
        .then(response => {
            res.json({ id: appointment.a_id });
        })
        .catch(error => {
            res.status(500).json({ error: error.message }); // Set status code for error response
        });
}

const generateAppointmentId = () => {
    return Math.floor(Math.random() * 1000);
}

module.exports = {
    addAppointments
};
