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
const getAppointmentIds = async (req, res) => {
    try {
        const appointments = await Appointment.find({}, 'id');
        const appointmentIds = appointments.map(appointment => appointment.id);
        res.json({ appointmentIds });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



const addAppointment = async (req, res, next) => {
    const { selectTestIds, selectTestNames, patientId, state, patientName,regdate, billValue } = req.body;

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
            billvalue:billValue,
        });

        // Save the appointment to the database
        const response = await appointment.save();

        res.json({ response });
    } catch (error) {
        res.status(500).json({ error });
    }
};


// Rajitha edited 
const getAppointmentsByID = async (req, res) => {
    try {
        const id = req.params.appointmentID;  //get Id by parameter 
        console.log(`Fetching appointment with ID: ${id}`);
        const appointment = await Appointment.findOne({ id: id });

        if (appointment) {
            res.json({ response: appointment });
        } else {
            res.status(404).json({ error: "Appointment not found" });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};


const updateAppointment =(req,res,next) =>{
    const {id,selectTests,pid,state,pname,regdate,
        billvalue} = req.body;
    // Prepare the update object based on user input
    let updateObject = {};
    if (state) {
        updateObject.state = state;
    }
    if (billvalue) {
        updateObject.billvalue = billvalue;
    }

    // Update the Test document
    Appointment.updateOne({ id: id }, { $set: updateObject })
        .then(response=> {
            res.json({response})
        })
        .catch(error=> {
            res.json({error})
        });
}

exports.updateAppointment = updateAppointment;
exports.addAppointment = addAppointment;
exports.getAppointments = getAppointments;
exports.getAppointmentIds = getAppointmentIds;
// rajitha add
 exports.getAppointmentsByID = getAppointmentsByID;
