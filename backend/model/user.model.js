import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
     email:{
        type:String,
        required:true,
        unique:true
    },
     password:{
        type:String,
        // required:true
    },
    photoUrl:{
        type:String,
        required:true
    },
    channel:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Channel'
    }
},{timestamps:true});

const UserModel = mongoose.model('User',userSchema);
export default UserModel;