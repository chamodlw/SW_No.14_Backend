const TestingUser = require("../models/model");

const getUserByID = async (req, res) => {
    try {
        const id = req.params.userID;  //get Id by parameter 
        console.log(`Fetching appointment with ID: ${id}`);
        const user = await TestingUser.findOne({ _id: id });

        if (appointment) {
            res.json({ response: user });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

module.exports = {getUserByID};