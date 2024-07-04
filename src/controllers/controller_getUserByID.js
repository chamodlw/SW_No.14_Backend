const User = require('../models/model_login');

const getUserByID = async (req, res) => {
    try {
        const id = req.params.id;  //get Id by parameter 
        console.log(`Fetching User with firstname: ${id}`);
        
        const user = await User.findOne({ _id: id });

        if (user) {
            res.json({ user });
        } else {
            res.status(404).json({ error: "user not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserByID = getUserByID;