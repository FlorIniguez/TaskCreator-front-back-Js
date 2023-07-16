const mongoose = require('mongoose');

const conectDB = async ()=>{
try {
    await mongoose.connect('mongodb+srv://iniguezflorencia:numen123@clusternumen.dtv44cs.mongodb.net/');
    console.log('DB is connected')

} catch (error) {
    console.log(error)
}
};
module.exports = conectDB;