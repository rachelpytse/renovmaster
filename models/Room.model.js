const { Schema, model } = require("mongoose");

const roomSchema = new Schema({
    userId:String,
    projectId:String,
    roomName: String,
    roomDescription: String,
    finishDate: Date,
    roomInitialPictures: [String], /*Je sais pas trop sous quel format on doit rentrer l'image*/
    threeDRendering: [String],
    currentPictures: [String],  
    Tasks : [{type: Schema.Types.ObjectId, ref: "Task"}],
    advancement : Number,
});

const Room = model("Room", roomSchema);

module.exports = Room;