const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const link =
    "mongodb+srv://admin:pass12342005@atlascluster.wy4iwzm.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster";
mongoose
    .connect(link, {
        useNewUrlParser: true,
    })
    .then(() => console.log("DB connection successful!"));


/// setup 

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'developer', 'user'],
        default: 'user'
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }]
})

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    assignedTo: {
        type: String,
        required: true
    }
})

const Task = mongoose.model('Task', taskSchema);
const User = mongoose.model('User', userSchema);

module.exports = { User, Task };