
const express = require('express');
const router = express.Router();
const adminmiddleware = require('../Middlware/adminmiddleware'); 
const {loginAdmin,getUsersTask,getUsers,deleteAll,getTasks} = require('../controller/adminControllers'); 

router.post('/login',loginAdmin)
router.get('/getusers',adminmiddleware,getUsers)
router.get('/getUsersTask',adminmiddleware,getUsersTask)
router.get('/getTasks',adminmiddleware,getTasks)

router.delete('/delete/:id',adminmiddleware, deleteAll);
module.exports=router