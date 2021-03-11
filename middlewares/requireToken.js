const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const UserModel = mongoose.model('User');
const jwtkey  =  process.env.JWTKEY;

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if(!authorization){
        return res.status(401).send({error: "You must be logged in"});
    }

    const token = authorization.replace("Bearer ","");

    //verifying token
    jwt.verify(token,jwtkey, async (err, playload) => {
        if(err){
            return res.status(401).send({error: "You must be logged in"});
        }

        // destructuring data
        const { userId } = playload;
        const userData = await UserModel.findById(userId);
        
        req.userData = userData;
        next();
    });
}