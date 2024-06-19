const User = require('../models/model_login');
const Recommendation = require('../models/model_recommendation'); // Assuming you have a model for recommendations
const { sendEmail } = require('../models/model_email');

const approveRecommendation = async (req, res, next) => {
    const { id } = req.params;

    try {
        const recommendation = await Recommendation.findById(id);
        if (!recommendation) {
            console.error('Recommendation not found for ID:', id);
            return res.status(404).json({ message: 'Recommendation not found' });
        }

        const user = await User.findById(recommendation.userId);
        if (!user) {
            console.error('User not found for ID:', recommendation.userId);
            return res.status(404).json({ message: 'User not found' });
        }

        await sendEmail(user.email, 'Recommendation Approval', recommendation.message);
        res.json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error approving recommendation:', error);
        res.status(500).json({ message: 'Failed to approve recommendation' });
    }
};

module.exports = { addUser, getUser, updateUser, deleteUser, login, getCurrentUser, authenticateJWT, authorizeRoles, approveRecommendation };
