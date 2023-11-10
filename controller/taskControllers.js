const TASK = require("../models/shematsk");

const addTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.body.userId;
        const newtask = await TASK.create({ title, description, owner: userId });
        res.status(201).json({ msg: "task added successfully", task: newtask });
    } catch (error) {
        res.status(500).json({ msg: "something went wrong", error: error });
    }
}

const getTask=async (req,res)=>{

    try {
        const userId=req.body.userId
        const newtasks=await TASK.find({owner:userId})
        res.status(201).json({msg:"get",tasks:newtasks})
    } catch (error) {
        res.status(500).json({msg:"somthing we, wrong",error:error})
        
    }
}

const deletTask=async (req,res)=>{

    try {
        const deltask=await TASK.findByIdAndDelete({_id:req.params.id},{...req.body})
        res.status(200).json({msg:"del",deltask:deltask})
        
    } catch (error) {
        res.status(500).json({msg:"somthing we, wrong",error:error})
        
    }
}

const updateTask=async (req,res)=>{

    try {
        const tupdatetask=await TASK.findByIdAndUpdate({_id:req.params.id},{...req.body})
        res.status(201).json({msg:"del",tasks:tupdatetask})
    } catch (error) {
        res.status(500).json({msg:"somthing we, wrong",error:error})
        
    }
}


module.exports = {addTask, getTask, deletTask, updateTask};
