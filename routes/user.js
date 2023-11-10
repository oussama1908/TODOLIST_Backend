const express = require('express');
const { registre, login,getuserdata,updateUser } = require('../controller/userController');
const authmiddlware = require("../Middlware/authmiddlware");
const router = express.Router();
const { body, validationResult } = require('express-validator');

 router.post("/registre",registre);
router.post("/login",login);
router.get("/userdata",authmiddlware,getuserdata);



router.post(
    '/registre',
    body('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/\d/).withMessage('Password must contain at least one digit'),
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(400).json({ errors: errorMessages });
    }
      registre(req, res); 
    }
);
router.put('/updateUser',updateUser)

module.exports = router;
