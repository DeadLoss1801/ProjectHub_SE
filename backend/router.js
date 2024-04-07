const express = require('express');
const router = express.Router();

const { createUser, getUserById, updateUserById, deleteUserById, getAllUsers } = require('./controllers/user-controller');

router.route('/user').post(createUser).get(getAllUsers)
router.route('/user/:id').get(getUserById).put(updateUserById).delete(deleteUserById)
module.exports = router;
