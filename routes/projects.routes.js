const router = require("express").Router();

const User = require("../models/User.model.js");
const Project = require("../models/Project.model.js");
const Room = require("../models/Room.model.js");
const dayjs = require("dayjs");

const fileUploader = require("../config/cloudinary.config");

let userProjects = {};
let userRooms = {};

// Route to display the welcome page

router.get("/", (req, res, next) => {
  console.log(req.session.currentUser && req.session.currentUser.projects);
  if (req.session.currentUser) {
    Project.find({ userId: req.session.currentUser._id })
      .then((projectsFromDB) => {
        userProjects = projectsFromDB;
        res.render("projects", { projectsFromDB, userProjects });
      })
      .catch((error) => next(error));
  } else {
    res.redirect("/login");
  }
});

// Route to display the formular to create a new project

router.get("/new", (req, res, next) => {
  res.render("newproject");
  console.log(req.session.currentUser._id);
});

// Route to create a new project

router.post("/new", (req, res, next) => {
  const projectInfo = {
    userId: req.session.currentUser._id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    phoneNb: req.body.phoneNb,
    email: req.body.email,
    firstMeetingDate: req.body.firstMeetingDate,
    firstMeetingAddress: req.body.firstMeetingAddress,
    projectDescription: req.body.projectDescription,
    projectDeadline: req.body.projectDeadline,
  };

  Project.create(projectInfo)
    .then((projectFromDB) => {
      console.log(projectFromDB._id);
      res.redirect(`/projects/${projectFromDB._id}`);
    })
    .catch((error) => next(error));
});

//Route to delete a project
router.post("/:id/delete", (req, res, next) => {
  const projectId = req.params.id;
  Project.findByIdAndDelete(projectId)
    .then(() => res.redirect("/projects"))
    .catch((error) => next(error));
});

//Route to display the page with project details

router.get("/:id", async (req, res, next) => {
  const projectId = req.params.id;
  console.log(projectId);
  try {
    projectDetails = await Project.findById(projectId);
    roomDetails = await Room.find({ projectId: projectId });
    userProjects = await Project.find({ userId: req.session.currentUser._id });
    console.log(projectDetails);
    projectDetails.projectDeadlineFormatted = dayjs(
      projectDetails.projectDeadline
    ).format("YYYY-MM-DD");
    projectDetails.firstMeetingDateFormatted = dayjs(
      projectDetails.firstMeetingDate
    ).format("YYYY-MM-DD");
    res.render("project-details", {
      projectDetails,
      roomDetails,
      userProjects,
    });
  } catch (error) {
    console.log("an error happened", error);
  }
});

//Route to edit project info

router.post("/:id", async (req, res, next) => {
  const projectId = req.params.id;
  try {
    projectDetails = await Project.findByIdAndUpdate(
      projectId,
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        projectDeadline: req.body.projectDeadline,
        address: req.body.address,
        phoneNb: req.body.phoneNb,
      },
      { new: true }
    );
    projectDetails.projectDeadlineFormatted = dayjs(
      projectDetails.projectDeadline
    ).format("YYYY-MM-DD");

    console.log("projectDetails", projectDetails);
    res.render("project-details", {
      projectDetails,
    });
  } catch (error) {
    console.log("an error happened", error);
  }
});

// Route to create a new room

router.post("/:projectId/rooms", (req, res, next) => {
  const roomInfo = {
    roomName: req.body.roomName,
    projectId: req.params.projectId,
    userId: req.session.currentUser._id,
    advancement:0,
  };
  console.log(roomInfo);
  Room.create(roomInfo)
    .then((newRoom) =>
      res.redirect(`/projects/${newRoom.projectId}/rooms/${newRoom._id}`)
    )
    .catch((error) => {
      console.log("an error happened", error);
    });
});

//Route to upload the floor plan

router.post(
  "/:projectId/photos",
  fileUploader.single("floorPlan"),
  (req, res) => {
    const projectId = req.params.projectId;
    const floorPlan = req.file.path;
    console.log("floorPlan :", floorPlan);
    Project.findByIdAndUpdate(
      projectId,
      { floorPlan: floorPlan },
      { new: true }
    )
      .then(() => res.redirect(`/projects/${projectId}`))
      .catch((error) =>
        console.log(`Error while uploading the floorPlan: ${error}`)
      );
  }
);

router.post(
  "/:projectId/photos/update",
  fileUploader.single("floorPlan"),
  (req, res) => {
    const projectId = req.params.projectId;
    const floorPlan = req.file.path;
    console.log("floorPlan :", floorPlan);
    Project.findByIdAndUpdate(
      projectId,
      { floorPlan: floorPlan },
      { new: true }
    )
      .then(() => res.redirect(`/projects/${projectId}`))
      .catch((error) =>
        console.log(`Error while uploading the floorPlan: ${error}`)
      );
  }
);

module.exports = router;
