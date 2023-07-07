const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    tasks: [
        {
            title: String,
            description: String,
            due: Date,
            status: String,
            user: String
        }
    ]
});

module.exports = mongoose.model('User', userSchema);