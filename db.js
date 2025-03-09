const mongoose = require('mongoose');

const dbUri = 'mongodb+srv://Jinolyn:9oFIt36Ew0GJIvsa@cluster0.zjw7m.mongodb.net/library_management_db?retryWrites=true&w=majority&appName=Cluster0'


module.exports = ()=> mongoose.connect(dbUri)