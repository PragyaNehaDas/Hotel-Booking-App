const jwt = require("jsonwebtoken")
const User = require("../models/userModel.js")

const auth = async(req, res, next) =>{
    try {
        const token = req.cookies.jwt;

        if(!token){
            res.status(400).json({message: "not authorized"});
        }

        //verify token
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        const user = await User.findById(data.id);

        if(!user){
            res.status(400).json({message: "not authorized"});
        }

        res.user = user;
        next();
    } catch (error) {
       console.log(error.message);
       return res.status(400).json({message: "no token"});        
    }
}

module.exports = {
    auth,
}