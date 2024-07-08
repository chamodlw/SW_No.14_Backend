const Testresult = require('../models/model_operator');

const UpdateTest = async (req, res) => {
    const { updatedData } = req.body;
    
    console.log("update", updatedData);
  
    try {
      const updatedResult = await Testresult.findOneAndUpdate(
        { testid: updatedData.testId },
        { testresults: updatedData.result },
        { new: true }
      );


  
      if (!updatedResult) {
        return res.status(404).json({ error: 'Test result not found' });
      }
  
      console.log('updatedResult', updatedResult);
      res.status(200).json({ message: 'Data updated successfully', updatedResult });
      
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while updating data' });
    }
  }

module.exports = UpdateTest;