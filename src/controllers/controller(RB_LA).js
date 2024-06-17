// const { request } = require('http');
// const { response } = require('./app');
// const User = require('./model');

// const getUsers =(req,res,next)=>{
//     User.find()
//     .then(response=>{
//         res.json({response})
//     })
//     .catch(error=>{
//         res.json({message:error})
//     })
// };




// const UpdateUser = (req,res,next)=>{
//     const { id,name} = req.body;
//     User.updateOne({id:id},{$set:{name:name}},)
//     .then(response=>{
//         res.json({response})
//     })
//     .catch(error=>{
//         res.json({error})
//     });


//     }

//     exports.getUsers= getUsers;
//     exports.UpdateUser=UpdateUser;