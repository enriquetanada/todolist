const express = require('express');
const toDoListController = require('./../controller/toDoListController');

const router = express.Router();

router
    .route('/')
    .get(toDoListController.getAllLists)
    .post(toDoListController.createList);

router
    .route('/:id')
    .get(toDoListController.getList)
    .patch(toDoListController.updateList)
    .delete(toDoListController.deleteList);


module.exports = router;