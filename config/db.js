const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async() => {
    try{
        await mongoose.connect(db)
        console.log('Mongo is connected');
        useNewUrlParser : true;
        userCreateIndex : true;
    }
    catch(err)
    {
        console.error(err);
        process.exit(1);
    }
}
module.exports = connectDB;