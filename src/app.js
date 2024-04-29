<<<<<<< Updated upstream
//app.js
const express = require('express');
const app = express();
const cors = require('cors');
const controller = require('./controllers/controller1.js');
=======
const express = require('express');
const cors = require('cors');
const app = express();
const controller = require('./controller');
>>>>>>> Stashed changes

app.use(cors());

app.use(
    express.urlencoded({
<<<<<<< Updated upstream
        extended:true,
=======
        extended: true,
>>>>>>> Stashed changes
    })
);

app.use(express.json());

<<<<<<< Updated upstream
//chamod start
app.get('/tests',(req,res)=>{
    controller.getTests(tests => {
        res.send(tests);
    });
});


app.post('/addtest',(req,res) =>{
    console.log('connect to mongodb');
    controller.addTest(req.body,(callack) =>{
        res.send(callack);
    });
});

app.post('/addappointment',(req,res) =>{
    console.log('connect to mongodb');
    controller.addAppointment(req.body,(callack) =>{
        res.send(callack);
    });
});

app.post('/updatetest',(req,res) =>{
    controller.updateTest(req.body,(callack) =>{
        res.send(callack);
    });
});

app.post('/deletetest',(req,res) =>{
    controller.deleteTest(req.body,(callack) =>{
        res.send(callack);
    });
});

app.post('/selecttest',(req,res) =>{
    controller.selectTest(tests =>{
        res.send(tests);
    });
});
//chamod end

module.exports = app;
=======
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

>>>>>>> Stashed changes
