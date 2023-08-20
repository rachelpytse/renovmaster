const router = require("express").Router();

const bcryptjs = require("bcryptjs");
const saltRounds = 10;

const fileUploader = require("../config/cloudinary.config");


const User = require("../models/User.model.js");
const Project = require("../models/Project.model.js");


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* Signup Page */
router.get("/signup", (req, res, next) => {
  res.render("signup");
});

router.post("/signup", (req, res, next) => {
  const { fullName, password, companyName, companyRegistrationNb, companyAddress, companyPostCode, phoneNb, email} = req.body;
  if(email ==="" /*|| User.find(email)*/ || password==="" ){
    res.render("signup", { errorMessage: "Email or password incorrect" })
    console.log(req.body)
  }
  else{
    bcryptjs
      .genSalt(saltRounds)
      .then((salt) => bcryptjs.hash(password, salt))
      .then((hashedPassword) => {
        User.create({ 
          fullName: fullName, 
          password: hashedPassword,
          companyName: companyName,
          companyRegistrationNb:companyRegistrationNb ,
          companyAddress: companyAddress,
          companyPostCode: companyPostCode,
          phoneNb: phoneNb,
          email: email,
        });
      })
      .then((newUser) => {
        // Set the session currentUser to the newly created user
        req.session.currentUser = newUser;
        res.redirect("/profile");
      })
      .catch((error) => next(error));
    
  }
});

/* Login Page */
router.get("/login", (req, res, next) => {
  res.render("login");
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body)
  User
    .findOne({email: email})
    .then((userFromDb) => {
      if (userFromDb && bcryptjs.compareSync(password, userFromDb.password)) {
        req.session.currentUser = userFromDb;
        res.redirect("/projects");
      } else {
        res.render("login", { errorMessage: "Email or password incorrect" });
      }
    })
    .catch((error) => {
      console.error("Error while connecting to db", error);
      next(error);
    });
});


/* Profile Page */
router.get("/profile", (req, res, next) => {
  if (req.session.currentUser) {

    User.findById(req.session.currentUser._id)
      .then((userData) => {
        res.render('profile', { userInSession: userData });
      })
      // .then(
      //   Project.find({ userId: req.session.currentUser._id })
      //   .then((projectsFromDB) => {
      //     userProjects = projectsFromDB;
      //     res.render("profile", { projectsFromDB, userProjects });
      //   })
      // )
      .catch((error) => {
        console.error("Error while getting the user from db", error);
        next(error);
      });
  } else {
    res.redirect("/login");
  }
});


//Route to upload the profilePic

router.post(
  "/profile/photo",
  fileUploader.single("profilePic"),
  (req, res) => {
    const userId = req.session.currentUser._id;
    const profilePic = req.file.path;
    console.log("profilePic :", profilePic);
    User.findByIdAndUpdate(
      userId,
      { profilePic: profilePic },
      { new: true }
    )
      .then(() => res.redirect(`/profile`))
      .catch((error) =>
        console.log(`Error while uploading the profilePic: ${error}`)
      );
  }
);

router.post(
  "/profile/photo/update",
  fileUploader.single("profilePic"),
  (req, res) => {
    const userId = req.session.currentUser._id;
    const profilePic = req.file.path;
    console.log("profilePic :", profilePic);
    User.findByIdAndUpdate(
      userId,
      { profilePic: profilePic },
      { new: true }
    )
      .then(() => res.redirect(`/profile`))
      .catch((error) =>
        console.log(`Error while uploading the profilePic: ${error}`)
      );
  }
);

// Edit Profile
router.get("/profile/edit", (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect("/login");
  }

  // Project.find({ userId: req.session.currentUser._id })
  //     .then((projectsFromDB) => {
  //       userProjects = projectsFromDB;
  //       res.render("profile-edit", { projectsFromDB, userProjects });
  //     })
  //     .catch((error) => next(error));
  
  User.findById(req.session.currentUser._id)
    .then((userData) => {
      res.render("profile-edit", { userInSession: userData });
    })
    .catch((error) => {
      console.error("Error while getting the user from db", error);
      next(error);
    });
});

router.post("/profile/edit", (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect("/login");
  }
  
  const { fullName, companyName, companyRegistrationNb, companyAddress, companyPostCode, phoneNb, email, password } = req.body;

  // Check if the new email is the same as the current user's email
  if (email === req.session.currentUser.email) {
    // Skip checking for duplicate email and continue with the update
  } else {
    // Check if the new email already exists in the database (excluding the current user's document)
    User.findOne({ email: email })
      .then((user) => {
        if (user) {
          // Send an error message to the client because this email is already associated with another user
          return res.render("profile-edit", { errorMessage: "This email is already associated with another account." });
        } else {
          // Continue with the update
        }
      })
      .catch((error) => {
        console.error("Error while checking for duplicate email", error);
        next(error);
      });
  }
  
  bcryptjs
    .genSalt(saltRounds)
    .then((salt) => bcryptjs.hash(password, salt))
    .then((hashedPassword) => {
      return User.findByIdAndUpdate(req.session.currentUser._id, {
        fullName: fullName, 
        password: hashedPassword,
        companyName: companyName,
        companyRegistrationNb:companyRegistrationNb ,
        companyAddress: companyAddress,
        companyPostCode: companyPostCode,
        phoneNb: phoneNb,
        email: email,
      }, { new: true });
    })
    .then(() => {
      res.redirect("/profile");
      req.session.currentUser = updatedUser;
    })
    .catch((error) => {
      console.error("Error while updating the user", error);
      next(error);
    });
});

router.get('/signout', (req, res, next) => {
  req.session.destroy(err => {
    if (err) next(err);
    res.redirect('/login');
  })
});




module.exports = router;
