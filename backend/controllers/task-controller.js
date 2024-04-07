const User = require('../model')
const Task = require('../model')

const createTask = async (req, res) => {
    try {
        const user = await User.findById(req.body.createdBy)
        const developer = await User.findById(req.body.assignedTo)

        if (!user || !developer) {
            return res.status(404).json({ error: 'User or Developer not found' });
        }

        const task = new Task(req.body);
        await task.save();


        // Adding in user's tasks 
        user.tasks.push(task._id);
        await user.save();
        // Adding in Developer's tasks
        developer.tasks.push(task._id);
        await developer.save();

        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateTaskById = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteTaskById = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // Remove the task from the user's tasks array
        await User.updateOne({ _id: task.createdBy }, { $pull: { tasks: task._id } });

        // Remove the task  from the developer's tasks array
        await User.updateOne({ _id: task.assignedTo }, { $pull: { tasks: task._id } });

        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = { createTask, getAllTasks, getTaskById, updateTaskById, deleteTaskById }