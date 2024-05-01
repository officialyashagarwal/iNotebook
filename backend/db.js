const mongoose = require('mongoose');

const mongoURi = "mongodb://127.0.0.1:27017/iNotebook"

const connectToMongo = () => {
    mongoose.connect(mongoURi)
}
module.exports = connectToMongo;