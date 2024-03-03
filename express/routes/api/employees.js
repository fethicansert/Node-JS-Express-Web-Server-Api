const express = require('express'); //For exprees app
const router = express.Router(); //Creatin router instance
const path = require('path');
const data = {};
data.employees = require('../../Data/employee.json'); //data { employees : 'json' }

//Routing means yonlendirme
router.route('/') //for getting all employess => localhost:8000/employess/ get all employee
    .get((req, res) => {
        console.log('GET METHOD');
        res.json(data.employees); //.json for send json data as response
    })
    .post((req, res) => { //post request will post new employee to database
        console.log('POST METHOD'.replaceAll(' ',''));
        res.json({
            "first_name": req.body.firstname,
            "last_name": req.body.lastname,
            "age": req.body.age
        })
    })  
    .put((req, res) => {
        console.log('PUT METHOD');
        res.json({
            "first_name": req.body.firstname,
            "last_name": req.body.lastname,
            "age": req.body.age
        });
    })
    .delete((req, res) => {
        console.log('DELETE METHOD');
        res.json({
            "id" : req.body.id
        })
    });

router.route('/:id')
    .get((req, res) => {
        console.log("GET AN EMPLOYEES (id)");
        console.log(req.params); //{ id: '1' } object
        res.json({
            "id": parseInt(req.params.id)
        })
    })

module.exports = router;



