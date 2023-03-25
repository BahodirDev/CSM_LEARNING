import categoryModal from "../model/categoryModal.js";
import slugify from "slugify";

export const create = async(req,res)=>{
    try {
        const {name} = req.body;
        console.log(name);
        const category = await categoryModal.findOne({name});
        if(category){
            return res.json({error:"Already exist"});
        }
        // const newCategory = await new categoryModal({name,slug:slugify(name)}).save();
        const newCategory = await  categoryModal.create({name,slug:slugify(name)});
        res.json(newCategory);

    } catch (error) {
        console.log(error);
    }
} 

export const remove = async(req,res)=>{
    try {
        const {categoryId} = req.params;
        let removed = await categoryModal.findByIdAndDelete(categoryId);
        res.json(removed)
    } catch (error) {
        console.log(error);
    }
}
export const update = async(req,res)=>{
    try {
        const {name} = req.body;
        const {categoryId} = req.params;
        let removed = await categoryModal.findByIdAndUpdate(categoryId,{
            name:name,
            slug:slugify(name)
        },{new:true});
        res.json(removed)
    } catch (error) {
        console.log(error);
    }
}
export const list = async(req,res)=>{
    try {
        let list = await categoryModal.find({});
        res.json(list)
    } catch (error) {
        console.log(error);
    }
}
export const singleCategory = async(req,res)=>{
    try {
        const {slug} = req.params;
        let one = await categoryModal.find({slug});
        res.json(one)
    } catch (error) {
        console.log(error);
    }
}