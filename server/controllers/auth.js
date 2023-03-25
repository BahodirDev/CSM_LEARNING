import userModel from "../model/userModel.js";
// import { hashPassword } from '../helper/authUser.js'
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
export const register = async (req, res) => {
    try {
        const { name, login, password,address } = req.body;

        if (!login) {
            return res.json({ error: "Login is required" });
        }

        const user = await userModel.findOne({ login })
        console.log(user);
        if (user) {
            res.json({ error: "User is already exist" });
        } else {


            if (!name) {
                return res.json({ error: "Name is required" });
            }
            if (!password) {
                return res.json({ error: "Password is required" });
            }


            /// let hashedPassword = await hashPassword(password);


            bcrypt.genSalt(12, async (err, hashed) => {
                if (err) {
                    console.log(err);
                }
                bcrypt.hash(password, hashed, async (err, hashedPassword) => {
                    if (err) {
                        console.log(err);
                    }
                    const user = await userModel.create({
                        name: name,
                        login: login,
                        address:user.address,
                        password: hashedPassword,
                    });

                    let token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });


                    res.json({
                        user: {
                            name: user.name,
                            login: user.login,
                            address:user.address,
                            isAdmin: user.isAdmin,
                            isAllowed: user.isAllowed
                        }, token
                    })

                })
            });




        }


    } catch (error) {
        console.log(error);
    }
}
export const login = async (req, res) => {
    try {
        const { login, password } = req.body;

        if (!login) {
            return res.json({ error: "Login is required" });
        }

        const user = await userModel.findOne({ login })
        if (!user) {
            res.json({ msg: "User is not found" });
        } else {


            if (!password) {
                return res.json({ error: "Password is required" });
            }


            /// let hashedPassword = await hashPassword(password);


            bcrypt.compare(password, user.password, (err, match) => {
                if (err) console.log(err);
                let token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

                res.json({
                    user: {
                        _id:user._id,
                        name: user.name,
                        login: user.login,
                        isAdmin: user.isAdmin,
                        isAllowed: user.isAllowed
                    }, token
                })
            })



        }


    } catch (error) {
        console.log(error);
    }
}
export const updateProfile = async(req,res)=>{
    try {
        const {id} = req.params;
        const {name,password,address} = req.body;
        let data = await userModel.findById(id);
        let update = await userModel.findByIdAndUpdate(id,{name:name ? name : data?.name},{new:true});
        res.json(update);
        
    } catch (error) {
        console.log(error);
    }
}