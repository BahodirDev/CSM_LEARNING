import {Schema, model} from 'mongoose';


const UserModel = new Schema({
    name:{
        type:String,
        required:true
    },
    login:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        unique:true
    
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false,
        required:true
    },
    isAllowed:{
        type:Boolean,
        default:false,
        required:true
    },
    Address:{
        type:String,
        default:String
    }
},{timestamps:true});

export default model('User',UserModel);