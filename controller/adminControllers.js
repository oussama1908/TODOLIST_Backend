const USER=require('../models/userschema')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const TASK = require('../models/shematsk');

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existUser = await USER.findOne({ email: email });
        if (!existUser) {
            return res.status(400).json({ msg: "No admin with this email" });
        }
        console.log(existUser.role)
        if (existUser.role === "admin") {
            const verify = await bcrypt.compare(password, existUser.password);
            if (!verify) {
                return res.status(400).json({ msg: "Wrong password" });
            }
            const token = await jwt.sign(
                { role: existUser.role },
                process.env.JWT,
                { expiresIn: "7D" }
            );
            return res.status(200).json({ msg: "Successfully logged in", token: token });
        } else {
            return res.status(400).json({ msg: "You are not authorized" });
        }
        // res.json({msg:"1"})
    } catch (error) {
        return res.status(500).json({ msg: "Something went wrong", error: error });
    }
};


const getTasks=async(req,res)=>{
    try {
        const tasks=await TASK.find().populate("owner")
        res.status(200).json({msg:"get all users",tasks:tasks})
    } catch (error) {
        res.status(500).json({msg:"somthing went worng",error:error})

    }
}

const getUsers=async(req,res)=>{
    try {
        const users=await USER.find()
        res.status(200).json({msg:"get all users",users:users})
    } catch (error) {
        res.status(500).json({msg:"somthing went worng",error:error})

    }
}

const getUsersTask=async(req,res)=>{
    try {
        const TASKS=await TASK.find({owner:req.params.id})
        res.status(200).json({msg:"get all users",TASKS:TASKS})
    } catch (error) {
        res.status(500).json({msg:"somthing went worng",error:error})

    }
}

const deleteAll = async (req, res) => {
    try {
        const deleteUsers = await USER.deleteOne({ _id: req.params.id });
        const deleteTask = await TASK.deleteMany({ owner: req.params.id });

        if (!deleteUsers) {
            return res.status(404).json({ msg: "User not found" });
        }
        
        res.status(200).json({ msg: "User deleted successfully",deleteTask:deleteTask, deletedUser: deleteUsers });
    } catch (error) {
        res.status(500).json({ msg: "Something went wrong", error: error });
    }
}


module.exports={loginAdmin,getUsersTask,getUsers,deleteAll,getTasks}