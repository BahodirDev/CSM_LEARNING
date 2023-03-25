import {Schema,model} from 'mongoose';

const categoryScheme = new Schema({
    name:{
        type:String,
        unique:true,
        required:true,
        maxlength:25
    },
    slug:{
        type:String,
        unique:true,
        requred:true,
        lowercase:true
    }
},{timestamps:true});

export default model('category',categoryScheme);

