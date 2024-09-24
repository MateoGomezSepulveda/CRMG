const mongoose = require('mongoose');

const dbConnection = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('DB ONLINE');
    } catch (error) {
        console.log(error);
        throw new Error('DB CANT INICILIZES');
    }
}

module.exports = {
    dbConnection
}