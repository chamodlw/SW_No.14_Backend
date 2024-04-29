const express = require('express');
const cors = require('cors');
const app = express();
const controller = require('./controller');

app.use(cors());

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());

app.get('/users',(req,res)=>{
    var resObj=[];
    controller.getUsers(req,res,next =>{

        res.send();
    });

app.put('/updateUser',(req,res)=>{
    controller.updateUser(req.body,(calback)=>{
        res.send(calback);
    });
})



    app.get('/user',(req,res)=>{
        const id=req.query.id;
        controller.getUserById(id,user =>{
res.send(user);
        });
    })

})

module.exports=  app;

