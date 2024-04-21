const mongoose = require('mongoose');

const conectDB = async ()=>{
try {
    await mongoose.connect('mongodb://localhost:27017');
    console.log('DB is connected')

} catch (error) {
    console.log(error)
}
};
module.exports = conectDB;