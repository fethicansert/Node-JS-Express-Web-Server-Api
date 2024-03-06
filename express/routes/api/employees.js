const express = require('express'); //For exprees app
const router = express.Router(); //Creatin router instance
const empController = require('../../controllers/employeesController');

//Routing means yonlendirme
router.route('/') 
    .get(empController.getAllEmployees)
    .post(empController.createNewEmployee)  
    .put(empController.updateEmployee)
    .delete(empController.deleteEmployee);


router.route('/:id')
    .get(empController.getEmployee);




module.exports = router;



