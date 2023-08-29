const { Schema, model } = require("mongoose");

const projectSchema = new Schema({
    userId: String,
    firstName: String,
    lastName: String,
    address : String,
    phoneNb : String,
    email : String,
    firstMeetingDate : Date,
    firstMeetingAddress : String,
    projectDescription : String,
    projectDeadline : Date,
    floorPlan : String,
    mainPicture : String,
    Rooms : [{type: Schema.Types.ObjectId, ref: "Room"}],
    status: {
        type: String,
        enum: ['meeting', 'design', 'material', 'workInProgress', 'Finished'],
        default: 'meeting'
    }

});

const Project = model("Project", projectSchema);

module.exports = Project;