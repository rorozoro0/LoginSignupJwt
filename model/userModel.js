const mongoose = require('mongoose');
require('mongoose-type-email');
mongoose.SchemaTypes.Email.defaults.message = 'Email address is invalid';


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "User's Name is required"],
    },
    email:{
        type:mongoose.SchemaTypes.Email,
        lowercase:true,
        required: [true, "User's Email is required"],
    },
    mobile:{
        type:Number,
        required: [true, "Phone No. is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true, "Password is required"]
    }    
});

const User = mongoose.model("User",userSchema);
module.exports = User; 