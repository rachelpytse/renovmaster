const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
    projectId : String,
    roomId : String,
    taskName: String,
    category : String,
    procedure : String,
    position : String, 
    remarks : String,
    materials: [{
        material: String,
        materialCost: Number,
    }],
    Done: Boolean,
    workers: [{
        workerName: String,
        workerHourlyPrice: Number,
        hoursSpent : Number
    }],
    startDate : Date,
    startAfter : String,
    finishDate:Date,

});

const Task = model("Task", taskSchema);

module.exports = Task;