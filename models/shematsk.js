const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Pending',
        enum: ["Pending", "Done"],
    },
    deadline: {
        type: Date,
        required: false
    },
    priority: {
        type: String,
        enum: ["High", "Medium", "Low","All"],
        default: "Medium"
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

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
