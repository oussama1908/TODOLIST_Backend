const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({
    title: {
        type: String, // Correct "string" to "String"
        required: true
    },
    description: {
        type: String, // Correct "string" to "String"
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});


const TASK = mongoose.model('Task', taskSchema);
module.exports = TASK; 
