const Employee = require('../model/Employee');

//get all employess from emp colloection
const getAllEmployees = async (req, res) => { 
    const employees = await Employee.find({}); 
    if(!employees) return res.status(204).json({ message: "No employees found." });
    res.json(employees);
}

const createNewEmployee = async (req, res) => {  //post new employee to database

    if(!req.body.firstname || !req.body.lastname || !req.body.age){
        return res.status(400).json({ "message": "Missing data." });
    }    

    try {
        const result = await Employee.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            age: req.body.age
        });
        res.status(201).json(result); 
    } catch(e) {
        console.log(e);
    }  
}

const updateEmployee = async (req, res) => {

    //check if emp id recieved from request body
    if(!req?.body?.id) return res.status(400).json({ error: "ID parameter required" });

    //check if find emp with given id
    const employee = await Employee.findOne({ _id: req.body.id }).exec();
    if(!employee) return res.status(204).json({ message : `No employee matched ID ${req.body.id}` });
    
    //checj if firstname lastname and age recieved from request body
    if(req?.body?.firstname) employee.firstname = req.body.firstname;
    if(req?.body?.lastname) employee.lastname  = req.body.lastname;
    if(req?.body?.age) employee.age = req.body.age;

    const result = await employee.save();
    res.json(result);
}

const deleteEmployee = async (req, res) => {
    
    if(!req.body.id) return res.status(400).json({ error: 'ID parameter required' });

    // const result = await Employee.findByIdAndDelete(req.body.id).exec();
    // if(!result) return res.status(400).json({ message: "User Not Founded" })

    const employee = await Employee.findById(req.body.id).exec();
    if(!employee) return res.status(204).json({ message : `No employee matched ID ${req.body.id}` });

    const result = await Employee.deleteOne({ _id: req.body.id });
    
    res.status(200).json(result);
   
}

const getEmployee = async (req, res) => {
    console.log(req?.params?.id);
    if(!req?.params?.id)  return res.status(400).json({ error: 'ID parameter required'  });

    const employee = await Employee.findById(req.params.id).exec();
    if(!employee) return res.status(400).json({"message": `Employee id: ${req.params.id} not found in the database`});

    res.json(employee);
} 

module.exports = { 
        getAllEmployees, 
        createNewEmployee, 
        updateEmployee, 
        deleteEmployee, 
        getEmployee
};