const express = require('express');
const router = express.Router();

const { createUser, getUserById, updateUserById, deleteUserById, getAllUsers } = require('./controllers/user-controller');
const { createTask, getAllTasks, updateTaskById, deleteTaskById, getTaskById } = require('./controllers/task-controller');

router.route('/user').post(createUser).get(getAllUsers)
router.route('/user/:id').get(getUserById).put(updateUserById).delete(deleteUserById)


router.route('/task').post(createTask).get(getAllTasks)
router.route('/task/:id').get(getTaskById).put(updateTaskById).delete(deleteTaskById)
module.exports = router;
