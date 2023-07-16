const {mongoose, Schema} = require('mongoose')

const taskSchema = new mongoose.Schema({
 title: {
    type: String,
    require: true,
 },
 description: {
    type: String,
    require: true,
 },
 date: {
    type: Date,
    default: Date.now,
 },
 user: 
 {type: mongoose.Schema.Types.ObjectId,
   ref: "User", required:true}
 //a que otro modelo hace referencia

},
{
   timestamps: true,
 })
const Task = mongoose.model("Task", taskSchema);
module.exports = Task;