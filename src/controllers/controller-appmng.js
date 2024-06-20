const Appointment = require('../models/model-appmng');

const getAppointments = (req, res) => {
    Appointment.find()
        .then(response => {
            res.json({ response });
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};

const addAppointment = async (req, res, next) => {
    const { selectTestIds, selectTestNames, patientId, state, patientName,regdate } = req.body;

    // Check if selectTestIds and selectTestNames arrays are of the same length
    if (selectTestIds.length !== selectTestNames.length) {
        return res.status(400).json({ error: "selectTestIds and selectTestNames arrays must have the same length" });
    }

    // Create an array to hold the tests with their IDs and names
    const selectTests = [];

    // Loop through the IDs and names arrays to create objects for each test
    for (let i = 0; i < selectTestIds.length; i++) {
        // Check if selectTestNames[i] exists before accessing it
        if (selectTestNames[i]) {
            selectTests.push({
                testId: selectTestIds[i],
                testName: selectTestNames[i]
            });
        } else {
            // Handle the error appropriately, such as logging or sending a specific response
            return res.status(400).json({ error: "Missing testName for selectTestIds[" + i + "]" });
        }
    }

    try {
        // Get the appointments from the database
        const appointments = await Appointment.find();

        // Find the maximum ID among the existing appointments
        let maxId = 0;
        appointments.forEach(appointment => {
            if (appointment.id > maxId) {
                maxId = appointment.id;
            }
        });

        // Generate the new appointment ID by adding 1 to the maximum ID
        const newAppointmentId = maxId + 1;

        // Create a new appointment object with the selectTests array and the new ID
        const appointment = new Appointment({
            id: newAppointmentId,
            selectTests: selectTests, // Include selectTests array in the appointment object
            pid:patientId,
            state:state,
            pname:patientName,
            regdate:regdate,
        });

        // Save the appointment to the database
        const response = await appointment.save();

        res.json({ response });
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.addAppointment = addAppointment;
exports.getAppointments = getAppointments;
