const data = {
    employees: require('../model/employee.json'),
    setEmployeess: function(data){ this.employees = data }
};

// console.log(data.employees);

const getAllEmployees = (req, res) => { //get all employess from database 
    // console.log("GET METHOD");
    res.json(data.employees);
}

const createNewEmployee = (req, res) => {  //post new employee to database
    const newEmployee = {
        "id" : data.employees[data.employees.length - 1].id + 1 || 1,
        "firstname" : req.body.firstname,
        "lastname" : req.body.lastname,
        "age" : req.body.age 
    }
    
    //I have to use return otherwise function continue
    //Than gives error beacuse cannot set headers after they are sent to the client
    if(!req.body.firstname || !req.body.lastname || !req.body.age){
        return res.status(400).json({"message": "Something missing !!!"});
    }                                                                       

    data.setEmployeess([...data.employees, newEmployee]);

    res.status(201).json(data.employees); //If I don't use return in if statement Cannot set headers after they are sent to the client
}

const updateEmployee = (req, res) => {

    //How course did!!!

    // const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    
    // if(!employee) {
    //     return res.status(400).json({ "message": `Employee id: ${req.body.id} not found in the database` });
    // }
    // if(req.body.firstname) employee.firstname = req.body.firstname;
    // if(req.body.lastname) employee.lastname = req.body.lastname;
    // if(req.body.age) employee.age = req.body.age;
    // //Better to parseInt maybe id come as String
    // const filteredArr = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    // const unsortedArr = [...filteredArr, employee];
    // data.setEmployeess(unsortedArr.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));

    // res.json(data.employees);

    //////   How I did !!!!
    const isValidId = data.employees.find(emp => emp.id === req.body.id);

    if(!isValidId) {
        return res.status(400).json({ "message": `Employee id: ${req.body.id} not found in the database` });
    }
 
    if(!req.body.firstname || !req.body.lastname || !req.body.age) {
        return res.status(400).json({"message": "Something missing !!!"});
    } else {
        const updatedEmployees = data.employees.map(employee => {
            if(employee.id === req.body.id){
                employee.firstname = req.body.firstname;
                employee.lastname = req.body.lastname;
                employee.age = req.body.age;
            }
    
            return employee;
        });
    
        data.setEmployeess(updatedEmployees);
        res.json(data.employees);    
    }
}

const deleteEmployee = (req, res) => {
    //How course did
    if(!data.employees.length) {
        return res.json({"message:" : "No Employees Left You Fire Them All BOSS!!"});
    }

    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));

    if(!employee){
        return res.status(400).send({"message": `Employee id: ${req.params.id} not found in the database`});
    }

    const filteredArr = data.employees.filter(emp => emp.id !== employee.id);
    data.setEmployeess([...filteredArr]);
    res.json(data.employees);

    //How I did
    // const isValidId = data.employees(emp => emp.id === req.body.id);

    // if(!isValidId){
    //     return res.status(400).json({"message": "Id is Not Valid"});
    // }

    // const deletedEmployees = data.employees.filter(employee => employee.id !== req.body.id);
    // data.setEmployeess(deletedEmployees);
    // res.json(data.employees);
}


const getEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.params.id));
    if(!employee){
        return res.status(400).json({"message": `Employee id: ${req.params.id} not found in the database`})
    }
    res.json(employee);
} 


const deleteAll  = (req, res) => {
    const arr = [];
    data.setEmployeess(arr);
    res.json(data.employees);
}
module.exports = { 
        getAllEmployees, 
        createNewEmployee, 
        updateEmployee, 
        deleteEmployee, 
        getEmployee,
        deleteAll
};