const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const ToDoModel = require('../models/toDoModel')

exports.getAllLists = catchAsync (async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const query = {};

    query.skip = limit * (page - 1);
    query.limit = limit;

    const lists = await ToDoModel.find({}, {}, query);
    
    res.status(200).json({
        status: 'success',
        results: lists.length,
        data: {
            lists
        }
    })    
})

exports.getList = catchAsync (async (req, res, next) => {
    const list = await ToDoModel.findById(req.params.id);

    if(!list) {
        return next(new AppError('No List founnd', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            list
        }
    })
})

exports.createList = catchAsync (async (req, res, next) => {
    const newToDo = new ToDoModel({
        task: req.body.task.toLowerCase(),
    });

    await newToDo.save();
    
    res.status(201).json({
        status: 'success',
        data : {
            list: newToDo
        }
    })

})

exports.updateList = catchAsync (async (req, res, next) => {
    const todo = await ToDoModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    if(!todo) {
        return next(new AppError('No task found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            todo
        }
    })    
})

exports.deleteList = async (req, res, next) => {
    let todo = await ToDoModel.findByIdAndDelete(req.params.id)

    if(!todo) {
        return next(new AppError('No task found', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    })
}