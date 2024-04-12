const verifyRoles = (...alowedRoles) => {
    return (req, res, next) => {
        if(!req?.roles) return res.status(401);;


        const rolesArr = [...alowedRoles];
        console.log(rolesArr);
        console.log(req.roles);
        
        //check if req.roles item includes in allowedRoles and set true in newArray if not set false
        //then try to find true item in newArray if it finds means alowed to pass
        const result = req.roles.map(role => alowedRoles.includes(role)).find(value => value === true);
        if(!result) return res.status(401).json({error: "Role Error"});
        next();
    };
};

module.exports = verifyRoles;