const express = require('express'); //For exprees app
const router = express.Router(); //Creatin router instance
const empController = require('../../controllers/employeesController');
const ROLE_LIST = require('../../config/rolesList');   
const verifyRoles = require('../../middleware/verifyRoles');


//Routing means yonlendirme
router.route('/') 
    .get(empController.getAllEmployees)
    .post(verifyRoles(ROLE_LIST.Admin, ROLE_LIST.Editor),empController.createNewEmployee)  
    .put(verifyRoles(ROLE_LIST.Admin, ROLE_LIST.Editor), empController.updateEmployee)
    .delete(verifyRoles(ROLE_LIST.Admin), empController.deleteEmployee);

router.route('/:id')
    .get(empController.getEmployee);




module.exports = router;



