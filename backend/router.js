const express = require('express');
const router = express.Router();

const { createUser, getUserById, updateUserById, deleteUserById, getAllUsers, verifyToken, login, restrictTo } = require('./controllers/user-controller');
const { createTask, getAllTasks, updateTaskById, deleteTaskById, getTaskById } = require('./controllers/task-controller');
const { mailHandler, proposalHandler } = require('./controllers/mail-controller');

router.post('/send-email', mailHandler);
router.post('/project-proposal', proposalHandler);
router
    .post('/login', login)

router
    .route('/user')
    .post(createUser)
    .get(getAllUsers)
router
    .route('/user/:id')
    .get(getUserById)
    .put(updateUserById)
    .delete(deleteUserById)


router
    .route('/task')
    .post(verifyToken, restrictTo("admin"), createTask)
    .get(getAllTasks)
router
    .route('/task/:id')
    .get(getTaskById)
    .put(updateTaskById)
    .delete(deleteTaskById)
module.exports = router;
