const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    staffid:
    {
        type:String,
        required :true,
        unique : true
    },
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique :true
    },
    password : {
        type : String,
        required : true,
    },
    department :
    {
        type : String,
        required :true
    },
    scopusId:{
        type : String,
        required :false
    },
    scholarId:{
        type : String,
        required :false
    },
    clarivate:{
        type : String,
        required :false
    }
});
module.export = User = mongoose.model('user',UserSchema);
module.exports  =  User;