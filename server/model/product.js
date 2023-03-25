import { Schema, model } from 'mongoose';

const productScheme = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 150
    },
    description: {
        type: String,
        maxlength: 2000,
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "category",
        required: true
    },
    slug: {
        type: String,
        lowercase: true
    },
    cost:{
        type:Number,
        required:true
    },
    count:{
        type:Number,
        required:true
    },
    sold:{
        type:Number,
        default:0
    },
    photo:{
        data:Buffer,
        contentType:String,
    }
},{timestamps:true});
export default model("product",productScheme);