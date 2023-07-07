const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/users", {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log('Connected to DB');
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;