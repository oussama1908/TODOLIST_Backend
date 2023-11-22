const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                // Use a regular expression to check if the email includes "@gmail.com"
                return /\@gmail\.com$/.test(value);
            },
            message: props => `${props.value} is not a valid Gmail address!`
        }
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    }
});

const User = mongoose.model('user', userschema);
module.exports = User;
