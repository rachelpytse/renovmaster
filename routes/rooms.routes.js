const router = require("express").Router();

const Project = require("../models/Project.model.js");
const Room = require("../models/Room.model.js");
const Task = require("../models/Task.model.js");
const User = require("../models/User.model.js");

const dayjs = require("dayjs");

const fileUploader = require("../config/cloudinary.config");

let userProjects = {};

router.get("/:projectId/rooms/:id", async (req, res, next) => {
  const roomId = req.params.id;
  let done = 0;
  let advancement = 0;
  try {
    userProjects = await Project.find({ userId: req.session.currentUser._id });
    tasksFromDB = await Task.find({ roomId: roomId });
    userInSession = await User.findById(req.session.currentUser._id);
    //Code to determine the advancement of the project
    console.log("tasksFromDB = ", tasksFromDB)
    if(tasksFromDB.length>0){
        tasksFromDB.forEach(function (el) {
            if (el.Done) {
              done += 1;
            }
        });
        advancement = (done / tasksFromDB.length) * 100;
    }

    console.log("advancement", advancement);
    roomFromDB = await Room.findByIdAndUpdate(
      roomId,
      { advancement: advancement },
      { new: true }
    );
    roomFromDB.finishDateFormatted = dayjs(roomFromDB.finishDate).format(
      "YYYY-MM-DD"
    );
    taskDetails = {
      painting: await Task.find({ roomId: roomId, category: "Painting" }),
      plumbing: await Task.find({ roomId: roomId, category: "Plumbing" }),
      electricity: await Task.find({ roomId: roomId, category: "Electricity" }),
      flooring: await Task.find({ roomId: roomId, category: "Flooring" }),
      other: await Task.find({ roomId: roomId, category: "Other" }),
    };
    console.log("roomFromDB", roomFromDB);
    res.render("room-details", { taskDetails, roomFromDB, userProjects, userInSession });
  } catch (error) {
    console.log("an error happened", error);
  }
});

router.post("/:projectId/rooms/:id", async (req, res, next) => {
  const roomId = req.params.id;
  try {
    roomFromDB = await Room.findByIdAndUpdate(
      roomId,
      {
        roomDescription: req.body.roomDescription,
        finishDate: req.body.roomCartEFDate,
      },
      { new: true }
    );
    roomFromDB.finishDateFormatted = dayjs(roomFromDB.finishDate).format(
      "YYYY-MM-DD"
    );

    console.log("roomFromDB", roomFromDB);
    res.render("room-details", {
      roomFromDB,
      // isHidden: roomFromDB.roomDescription && roomFromDB.finishDateFormatted,
    });
  } catch (error) {
    console.log("an error happened", error);
  }
});

//Route to upload Room's img

router.post(
  "/:projectId/rooms/:id/photos",
  fileUploader.fields([{ name: "roomImg", maxCount: 10 }]),
  (req, res) => {
    const photoToUpdate = req.query.field;
    const projectId = req.params.projectId;
    const roomId = req.params.id;
    const updatedPhotos = req.files.roomImg.map((el) => el.path);
    console.log(
      "updatedPhotos:",
      updatedPhotos,
      "Photo to Update",
      photoToUpdate
    );
    switch (photoToUpdate) {
      case "roomInitialPictures":
        Room.findByIdAndUpdate(
          roomId,
          { $push: { roomInitialPictures: updatedPhotos } },
          { new: true }
        )
          .then((roomFromDB) => {
            console.log("RoomFromDB", roomFromDB);
            res.redirect(`/projects/${projectId}/rooms/${roomId}`);
          })
          .catch((error) =>
            console.log(`Error while uploading the floorPlan: ${error}`)
          );
        break;
      case "threeDRendering":
        Room.findByIdAndUpdate(
          roomId,
          { $push: { threeDRendering: updatedPhotos } },
          { new: true }
        )
          .then((roomFromDB) => {
            console.log("RoomFromDB", roomFromDB);
            //test code pour upload la main image
            Project.findByIdAndUpdate(
              projectId,
              { mainPicture: roomFromDB.threeDRendering[0] },
              { new: true }
            )
              .then(() =>
                res.redirect(`/projects/${projectId}/rooms/${roomId}`)
              )
              .catch((error) => console.log("stg happened", error));
          })
          .catch((error) =>
            console.log(`Error while uploading the floorPlan: ${error}`)
          );
        break;
      case "currentPictures":
        Room.findByIdAndUpdate(
          roomId,
          { $push: { currentPictures: updatedPhotos } },
          { new: true }
        )
          .then((roomFromDB) => {
            console.log("RoomFromDB", roomFromDB);
            res.redirect(`/projects/${projectId}/rooms/${roomId}`);
          })
          .catch((error) =>
            console.log(`Error while uploading the floorPlan: ${error}`)
          );
        break;
    }
  }
);

//Route to delete Room
router.get("/:projectId/rooms/:roomId/del", (req, res, next) => {
  const projectId = req.params.projectId;
  const roomId = req.params.roomId
  Room.findOneAndDelete({_id: roomId})
  .then(function () {
    res.redirect(`/projects/${projectId}`);
  })
  .catch((error) => {
    console.log("an error happened", error);
  });
});

//Route to delete Room's img

router.get(
  "/:projectId/rooms/:id/photos/del/:field/:index",
  (req, res, next) => {
    const field = req.params.field;
    const projectId = req.params.projectId;
    const roomId = req.params.id;
    const index = Number(req.params.index); // "1"
    console.log("Index is", index);

    if (
      !["roomInitialPictures", "threeDRendering", "currentPictures"].includes(
        field
      )
    ) {
      next(new Error("Invalid photo field"));
    }

    // switch (field) {
    //   case 'roomInitialPictures' {

    //   }
    // }

    Room.findById(roomId).then((roomFromDB) => {
      roomFromDB[field].splice(index, 1);
      roomFromDB.save().then(() => {
        res.redirect(`/projects/${projectId}/rooms/${roomId}`);
      });
    });
  }
);



router.post("/:projectId/rooms/:roomId/tasks", (req, res, next) => {
  const taskInfo = {
    projectId: req.params.projectId,
    roomId: req.params.roomId,
    randomParam: "random",
  };
  console.log(taskInfo);
  Task.create(taskInfo)
    .then((taskFromDB) =>
      res.redirect(
        `/projects/${taskFromDB.projectId}/rooms/${taskFromDB.roomId}/tasks/${taskFromDB._id}/edit`
      )
    )
    .catch((error) => {
      console.log("an error happened", error);
    });
});

//Route to toggle a task's done status
router.post("/:projectId/rooms/:roomId/tasks/:id/check", (req, res, next) => {
  const taskId = req.params.id;
  const isDone = req.body.isDone === 'true'; // Extract from request body

  Task.findByIdAndUpdate(taskId, { Done: isDone }, { new: true })
    .then((taskFromDB) => {
      console.log(taskFromDB.procedure, isDone ? "checked!" : "unchecked!");
      res.redirect(
        `/projects/${taskFromDB.projectId}/rooms/${taskFromDB.roomId}`
      );
    })
    .catch((error) => next(error));
});


//Route to edit a Task
router.get("/:projectId/rooms/:roomId/tasks/:id/edit", async(req, res, next) => {
  const taskId = req.params.id;
  try {
    const taskFromDB = await Task.findById(taskId);
    const userProjects = await Project.find({userId: req.session.currentUser._id});
    const userInSession = await User.findById(req.session.currentUser._id)
    res.render("tasks-newedit", {taskFromDB, userProjects, userInSession})
  } 
  catch(error) {next(error)};
});


router.post("/:projectId/rooms/:roomId/tasks/:id/edit", (req, res, next) => {
  const taskId = req.params.id;
  const taskInfo = {
    category: req.body.category,
    procedure: req.body.procedure,
    position: req.body.position,
    remarks: req.body.remarks,
    materials: [
      {
        material: req.body.material,
        materialCost: req.body.materialCost,
      },
    ],
    workers: [
      {
        workerName: req.body.workerName,
        workerHourlyPrice: req.body.workerPrice,
        hoursSpent: req.body.workerTime,
      },
    ],
    startDate: req.body.startDate,
    /*startAfter : req.body.startAfter,*/
    finishDate: req.body.finishDate,
  };
  Task.findByIdAndUpdate(taskId, taskInfo, { new: true })
    .then((taskFromDB) => {
      console.log(taskFromDB);
      res.redirect(
        `/projects/${taskFromDB.projectId}/rooms/${taskFromDB.roomId}`
      );
    })
    .catch((error) => next(error));
});

module.exports = router;
