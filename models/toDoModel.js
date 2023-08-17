const mongoose= require('mongoose');
const { Schema } = mongoose;

const todoList = new mongoose.Schema({
    task: {
        type: String,
        required: [true, 'Task is required'],
        unique: true
    },
})

const ToDoList= mongoose.model('ToDoList', todoList);

module.exports = ToDoList;