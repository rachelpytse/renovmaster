const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const projectSchema = new Schema({
    userId: String,
    firstName: String,
    lastName: String,
    address : String,
    phoneNb : Number,
    email : String,
    firstMeetingDate : Date,
    firstMeetingAddress : String,
    projectDescription : String,
    projectDeadline : Date,
    floorPlan : String,
    mainPicture : String,
    Rooms : [{type: Schema.Types.ObjectId, ref: "Room"}],

});

const Project = model("Project", projectSchema);

module.exports = Project;