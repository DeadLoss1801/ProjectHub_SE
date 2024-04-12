const { User, Task } = require('../model');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'deadloss1801@gmail.com',
        pass: 'ccqumarifjwbsytc'
    }
});
const createTask = async (req, res) => {
    try {
        console.log(req.body);
        const user = await User.findOne({ 'email': req.body.client })
        const developer = await User.findOne({ 'email': req.body.assignedTo })

        if (!user || !developer) {
            return res.status(404).json({ error: 'User or Developer not found' });
        }

        req.body.createdBy = user.email;
        req.body.client = undefined;
        const task = new Task(req.body);
        await task.save();

        // Adding in user's tasks 
        user.tasks.push(task._id);
        await user.save();
        // Adding in Developer's tasks
        developer.tasks.push(task._id);
        await developer.save();

        const mailOptions = {
            from: 'deadloss1801@gmail.com',
            to: `${user.email}`,
            subject: 'Project Updated',
            text: `Your Project has been Assigned to ${developer.name}.\n And You can contact him/her.\n${developer.email} `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                res.status(500).send('Failed to send email');
            } else {
                console.log('Email sent:', info.response);
            }
        });

        const mailOptions2 = {
            from: 'deadloss1801@gmail.com',
            to: `${developer.email}`,
            subject: 'Project Updated',
            text: `You have been assigned to project ${task.title}.\nClient is ${user.name}And You can contact him/her.\n${developer.email}`
        };

        transporter.sendMail(mailOptions2, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                res.status(500).send('Failed to send email');
            } else {
                console.log('Email sent:', info.response);
            }
        });

        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        return res.json(tasks);
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