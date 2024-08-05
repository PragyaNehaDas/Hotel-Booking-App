const User = require("../models/userModel.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const getUsers = async(req, res, next) =>{
    try {
        const users = await User.find();

        if(!users){
            res.status(400).json({message: "user not found"});
        }

        return res.status(200).json(users);
    } catch (error) {
        next(error)
    }
};

//create user
const createUser = async(req, res, next) =>{
    try {
        const {password, ...rest} = req.body;

        //generate salt
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password, salt)
        const user = await User.create({
            ...rest,
            password: hashedPassword,
        });
       
       if(!user){
        res.status(400).json({message: "user not created"});
       }

       //hash the password before saving to database
       const {password: userPassword, ...otherDetails} = user._doc;

       return res.status(201).json(otherDetails);
    } catch (error) {
        next(error)
    }
}

//user login
const loginUser = async (req, res, next) =>{
    try{

        //todo use joi try to validate data

        const {email, password} = req.body;

        //get user from database
        const user = await User.findOne({email});

        if(!user){
            res.status(400).json({message: "user not found"})
        }

        //compare the password
        const isCorrect = await bcrypt.compare(password, user.password)

        if(!isCorrect){
            res.status(400).json({message: "password incorrect"});
        }

        //generate token 
        //set cookie
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY);
        res.cookie("jwt", token);

        const {password: userPassword, ...rest} = user._doc;
        
        return res.status(200).json({
            ...rest,
        })
    }
    catch(error){
        next(error)
    }
}

//logout user
const logoutUser = async (req, res, next) =>{
    res.cookie("jwt", "", {expiresIn: "-1"});
    return res.json({message: "you have been logged out"});
}

module.exports = {
    getUsers,
    createUser,
    loginUser,
    logoutUser,
}