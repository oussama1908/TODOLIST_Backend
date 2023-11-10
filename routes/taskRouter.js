const mongoose = require('mongoose');

const express = require('express');
const router = express.Router();
const authmiddleware = require('../Middlware/authmiddlware'); 
const {addTask,getTask,updateTask,deletTask} = require('../controller/taskControllers'); 


router.post("/post", authmiddleware, addTask);

router.get('/get', authmiddleware, getTask);

router.delete('/del/:id',authmiddleware,deletTask)
router.put('/put/:id',authmiddleware,updateTask)


module.exports = router;
