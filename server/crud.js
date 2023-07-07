const User = require("./schema");
const connectDB = require("./connect-db");
const bcrpyt = require('bcryptjs');
const {CreateTask, DeleteTask, UpdateTask} = require('../utils/utility.js')

const createUser = async (user) => {
    await connectDB();
    try {
        const newUser = new User(user);
        await newUser.save();
        return true;
    } catch (error) {
        return false;
    }
}

const findUser = async (email, password) => {
    connectDB();
    try {
        const user = await User.findOne({email: email});
        console.log(user);
        if (user) {
            const check = bcrpyt.compareSync(password, user.password);
            console.log("Password check", password, user.password);
            console.log("check flag", check);
            if (check) {
                return user;
            } else {
                return false;
            }
        } else {
            console.log("user not found");
            return false;
        }
    } catch (error) {
        return false;
    }
}


// Task Operations
const fetchTasks = async (email) => {
    connectDB();
    try {
        const user = await User.findOne({email: email});
        if (user) {
            return user.tasks;
        } else {
            console.log("user not found");
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

const addTask = async (email, task) => {
    connectDB();
    try {
        const user = await User.findOne({email: email});
        if (user) {
            user.tasks = CreateTask(user.tasks, task);
            await user.save();
            return user.tasks;
        } else {
            console.log("user not found");
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

const deleteTask = async (email, task) => {
    connectDB();
    try {
        const user = await User.findOne({email: email});
        if (user) {
            console.log(user.tasks.length);
            user.tasks = DeleteTask(user.tasks, task);
            console.log(user.tasks.length);
            await user.save();
            return user.tasks;
        } else {
            console.log("user not found");
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

const updateTask = async (email, task, updatedTask) => {
    connectDB();
    try {
        const user = await User.findOne({email: email});
        if (user) {
            user.tasks = UpdateTask(user.tasks, task, updatedTask);
            await user.save();
            return user.tasks;
        } else {
            console.log("user not found");
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

const fetchAll = async () => {
    let Users = [];
    connectDB();
    try {
        const users = await User.find({});
        console.log(users);
        if (users) {
            users.forEach(user => {
                Users.push({
                    name: user.name,
                    email: user.email,
                    tasks: user.tasks
                });
            });
            return Users;
        } else {
            return false;
        }

    } catch (error) {
        return false;
    }
}

module.exports = {
    createUser, findUser, fetchTasks, addTask, deleteTask, updateTask, fetchAll
}