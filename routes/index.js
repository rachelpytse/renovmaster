const router = require("express").Router();

const bcryptjs = require("bcryptjs");
const saltRounds = 10;

const User = require("../models/User.model.js");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* Signup Page */
router.get("/signup", (req, res, next) => {
  res.render("signup");
});

router.post("/signup", (req, res, next) => {
  const { fullName, password, companyRegistrationNb, companyAddress, companyPostCode, phoneNb, email} = req.body;
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
          companyRegistrationNb:companyRegistrationNb ,
          companyAddress: companyAddress,
          companyPostCode: companyPostCode,
          phoneNb: phoneNb,
          email: email,
        });
      })
      .catch((error) => next(error));
    res.redirect("/profile");
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
    res.render('profile', {userInSession : req.session.currentUser})
    }
  else {
    res.redirect("/login");
  }
});

module.exports = router;
