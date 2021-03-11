const UserModel = require('../model/userModel');
const jwt = require('jsonwebtoken')
const jwtKey = process.env.JWTKEY;

exports.signUp = async (req, res) => {
    try {
        console.log(req.body);
        const newUser = await UserModel.create(req.body);
        const token = jwt.sign({userId:newUser._id},jwtKey);
            
        res.status(200).json({
            status:'success',
            token
        });
    }catch(err){
        res.status(404).json({
            status:'fail',
            error:err.message
        });
    }
}

exports.logIn = async (req, res) => {
    
    const {mobile, password} = req.body;
    
    if(!mobile || !password){
            res.status(422).json({
            status:"Fail",
            error: "Please enter correct shop code and Password "
        })
    }
    
    try{

        const user = await UserModel.findOne({mobile: mobile, password: password});
        
        const token = jwt.sign({userId: user._id}, jwtKey);
        res.send({token});

    }catch(err){
        res.status(404).json({
            status:'Invalid Email or password',
            error:err
        });
    }
}

exports.getDetails = async (req, res) => {

    try{
        const userData = await UserModel.findById(req.userData,{'_id':0,'name':1,'email':1});
        res.status(200).json({
            userData: userData
        })

    }
    catch(err){
        res.status(404).json({
            status:'Data Not found',
            error:err
        });
    }
}