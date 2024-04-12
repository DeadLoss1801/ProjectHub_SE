const { User } = require('../model');
const jwtSecret = 'your_jwt_secret_key_here';
const jwt = require('jsonwebtoken');
const { use } = require('../router');

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    if (password != user.password) {
        return res.status(403).json({ message: 'Password incorrect' });
    }

    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });
    return res.status(200).json({ token });
}


const verifyToken = async (req, res, next) => {
    let token = req.headers['authorization'];
    console.log(token);

    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        token = token.split(' ')[1];
        jwt.verify(token, jwtSecret, (err, decoded) => {
            console.log("L  ");
            if (err) return res.status(401).json({ message: 'Unauthorized', "Error": err });
            req.user = decoded;

        });
        const id = req.user.id;

        const user = await User.findById(id);
        req.user = user;
        next();
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(500).json({ message: "You does not have permission" })
        }
        next();
    }
}
// create a new user 
const createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Read a user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update a user by ID
const updateUserById = async (userId, userData) => async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// Delete a user by ID
const deleteUserById = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.json(users);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
module.exports = { createUser, getUserById, updateUserById, deleteUserById, getAllUsers, login, verifyToken, restrictTo };
