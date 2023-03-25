import fs from 'fs';
import slugify from 'slugify';
import productModel from '../model/product.js'

export const create = async (req, res) => {
    try {
        const { name, description, categoryId, email, cost, count } = req.fields;
        const { photo } = req.files;
        console.log(photo.size);
        if (!name) {
            return res.json({ error: "Name filed is required" });
        }
        if (!categoryId) {
            return res.json({ error: "Something went wrong" });
        }

        if (!cost) {
            return res.json({ error: "Cost filed is required" });
        }
        if (!count) {
            return res.json({ error: "Count filed is required" });
        }
        if (!photo || photo.size > 1000000) {
            return res.json({ error: "Photo size must be less than 1mb" });
        }

        let product = await new productModel({ ...req.fields, slug: slugify(name) })
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type
        }
        product.save();
        res.json(product.name)

    } catch (error) {
        console.log(error);
    }
}

export const singleProduct = async (req, res) => {
    try {
        const { slug } = req.params;
        let product = await productModel.findOne({ slug }).select('-photo').populate('categoryId');
        res.json(product);
    } catch (error) {
        console.log(error);
    }
}
export const list = async (req, res) => {
    try {
        let products = await productModel.find({}).select('-photo').populate("categoryId");
        res.json(products);
    } catch (error) {
        console.log(error);
    }

}
export const photo = async (req, res) => {
    try {
        const { productId } = req.params;
        let product = await productModel.findById(productId).select('photo');
        res.set("Content-type", product.photo.contentType);
        res.send(product.photo.data);
    } catch (error) {
        console.log(error);
    }
}

export const remove = async (req, res) => {
    try {
        const { productId } = req.params;
        let product = await productModel.findByIdAndDelete(productId).select("-photo");
        res.json(product);
    } catch (error) {
        console.log(error);
    }
}

export const update = async (req, res) => {
    try {
        const { name, description, categoryId, email, cost, count } = req.fields;
        const { photo } = req.files;
        const { productId } = req.params;


        if (!name) {
            return res.json({ error: "Name field is required" });
        }
        if (!categoryId) {
            return res.json({ error: "Something went wrong" });
        }

        if (!cost) {
            return res.json({ error: "Cost field is required" });
        }
        if (!count) {
            return res.json({ error: "Count fieled is required" });
        }

        let product = await productModel.findByIdAndUpdate(productId, {
            ...req.fields,
            slug: slugify(name)
        });

        if (photo && photo.size > 1000000) {
            return res.json({ error: "Photo size must be less than 1mb" });
        } else if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type
        }
        product.save();
        res.json(product._id)

    } catch (error) {
        console.log(error);
    }
}

export const filterProducts = async (req, res) => {
    try {
        const { check, radio } = req.body;
        let query = {};
        if (check.length) query.categoryId = check;
        if (radio.length) query.cost = { $gte: radio[0], $lte: radio[1] };

        // query = {categoryId:['asdfdfssd'],cost:{katta:12,kichik:20}}

        let data = await productModel.find(query).select('-photo');
        res.json(data)
    } catch (error) {
        console.log(error);
    }
}

export const productsCount = async (req, res) => {
    try {
        let count = await productModel.estimatedDocumentCount();
        res.json(count)
    } catch (error) {
        console.log(error);
    }
}

export const productsPage = async (req, res) => {
    try {
        let perPage = 3;
        let page = req.params.page ? req.params.page : 1;
        let data = await productModel.find({}).select("-photo").skip((page - 1) * perPage).limit(perPage).sort({ createdAt: -1 });
       console.log(data);
        res.json(data)
    } catch (error) {
        console.log(error);
    }
}

export const productsSearch=async(req,res)=>{
    try {
        const {query} = req.params;

        let data = await productModel.find({
            $or:[
                {name:{$regex:query,$options:"i"}},
                {description:{$regex:query,$options:"i"}},
            ]
        });

        res.json(data)
        
    } catch (error) {
        console.log(error);
    }
}

export const categories = async(req,res)=>{
    try {
        const {slug} = req.params;
        let data = await productModel.find({slug}).populate("");
        // let data = await productModel.find({});
        res.json(data);
    } catch (error) {
        console.log(error);
    }
}

// 100 -( 3 * 3)