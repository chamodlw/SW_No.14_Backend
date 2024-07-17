const { sendApprovalEmail } = require('../models/model_email');
const User = require('../models/model_login');
const Testresult = require('../models/model_operator');
const Test = require('../models/model-tmng'); // Assuming Test model with test details

const approveReport = async (req, res) => {
    const { reportId, doctorName, recommendation, patientId } = req.body;

    try {
        const user = await User.findById(patientId);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const userFirstName = user.firstname;
        const userLastName = user.lastname;
        const userEmail = user.email;
        const userSex = user.sex; // Ensure 'sex' is a field in your schema

        // Fetch relevant test results based on reportId
        const testResult = await Testresult.find({ id: reportId }).select('testtype testresults');

        // Fetch min, max, and unit based on testtype
        const tableDataPromises = testResult.map(async result => {
            const testDetails = await Test.findOne({ name: result.testtype }); // Assuming 'name' corresponds to 'testtype'
            return {
                testName: result.testtype,
                result: result.testresults,
                min: testDetails ? testDetails.min : 0,
                max: testDetails ? testDetails.max : 100,
                unit: testDetails ? testDetails.unit : 'ExampleUnit',
            };
        });

        const tableData = await Promise.all(tableDataPromises);

        const data = {
            patientName: `${userFirstName} ${userLastName}`,
            patientEmail: userEmail,
            patientSex: userSex,
            ReportedOn: new Date().toLocaleDateString(), // Example date, adjust as needed
            tableData: tableData,
            labTechnician: 'Rajith Singh', 
            doctor: doctorName,
            reportId: reportId,
            recommendation: recommendation,
            patientID: patientId,
        };

        // Log the attempt to approve report
        const logMessage = `Patient ID: ${patientId}\nApproved the report ID: ${reportId} by Dr. ${doctorName},\nRecommendation: ${recommendation}`;
        console.log(logMessage);

        await sendApprovalEmail(userEmail, data, logMessage);
        console.log('Approval email sent successfully');
        res.status(200).send({ message: 'Approval email sent successfully' });

    } catch (error) {
        console.error('Error approving report:', error);
        res.status(500).send({ message: 'Failed to send approval email', error: error.message });
    }
};

module.exports = { approveReport };
