const User = require("../models/User.model.js");
const Project = require("../models/Project.model.js");
const Room = require("../models/Room.model.js");
const Tasks = require("../Tasks.model.js") ;

// Création projets

/*
const projects = [
    { 
    firstName: "Jean-Pierre", 
    lastName: "Dubois", 
    phoneNb: "0622334455", 
    email: "jp.dubois@mail.com", 
    address: "12 Rue La Boetie, 75008 Paris",
    firstMeetingDate: "2023-05-22",
    firstMeetingAddress: "Same as client's address",
    //nextMeetingAddress: "Same as client's address",
    projectDescription: "Apartment renovation",
    projectDeadline: "2023-07-30",
    },
    { 
    firstName: "Isabelle",
    lastName: "Moreau",
    phoneNb: "0739214658",
    email: "isabelle.moreau@mail.com",
    address: "2 Avenue de l'Opera, 75001 Paris",
    firstMeetingDate: "2023-06-18",
    firstMeetingAddress: "Same as client's address",
    //NextMeetingAddress: "Same as client's address",
    projectDescription: "Bathroom renovation",
    projectDeadline: "2023-08-15",
    },
    { 
    firstName: "Henri",
    lastName: "Marchand",
    phoneNb: "0756984123",
    email: "henri.marchand@mail.com",
    address: "58 Boulevard Saint-Germain, 75005 Paris",
    firstMeetingDate: "2023-06-10",
    firstMeetingAddress: "Same as client's address",
    //nextMeetingAddress: "Same as client's address",
    projectDescription: "Shop interior renovation",
    projectDeadline: "2023-08-30",
    },
    {
    firstName: "Elodie",
    lastName: "Martin",
    phoneNb: "0708123478",
    email: "elodie.martin@mail.com",
    address: "90 Rue de Rivoli, 75004 Paris",
    firstMeetingDate: "2023-06-15",
    firstMeetingAddress: "Same as client's address",
    //nextMeetingAddress: "Same as client's address",
    projectDescription: "Complete apartment renovation",
    projectDeadline: "2023-12-15",
    },
    {
    firstName: "Claude",
    lastName: "Girard",
    honeNb: "0687543212",
    email: "claude.girard@mail.com",
    address: "25 Rue de la Paix, 75002 Paris",
    firstMeetingDate: "2023-05-30",
    firstMeetingAddress: "Same as client's address",
    //nextMeetingAddress: "Same as client's address",
    projectDescription: "Restaurant renovation",
    projectDeadline: "2023-09-01",
    projectMap: "https://medias.logisneuf.com/occitanie/herault/baillargues/limperiale/images/18347/lots/633021/large/PLE11.JPG",
    rooms : [
        { 
        roomName: "Kitchen",
        roomDescription: "renovate this kitchen",
        finishDate: "2024-06-30",
        roomInitialPictures: ["https://cdna.artstation.com/p/assets/images/images/041/046/090/large/nour-eldeen-old-kitchen-jpg.jpg?1630597603"],
        threeDRendering: ["https://c8.alamy.com/comp/2B7WEKF/3d-render-of-modern-kitchen-interior-2B7WEKF.jpg"],
        currentPictures: ["https://st.hzcdn.com/simgs/cee168530b807148_4-3253/home-design.jpg"],  
        tasks: [
            {
            taskName : "Change plumbing system",
            category : "Plumbing", 
            procedure: "Inspect current plumbing system",
            position : "under the sink",
            remarks : "Call the site manager to stop water before inspection",
            materials: [
                {
                material : "",
                materialCost : 100,
                done : true,
                }
            ],
            workers: [
                {
                workerName: "Mauricio",
                workerHourlyPrice: 15,
                hoursSpent : 2,
                }
            ],
            startDate : "01-01-2022",
            startAfter : "Plumbing",
            finishDate: "31-01-2022",
            },
            {
            taskName : "Change plumbing system",
            category : "Plumbing", 
            procedure: "Inspect current plumbing system",
            position : "under the sink",
            remarks : "Call the site manager to stop water before inspection",
            materials: [
                {
                material : "",
                materialCost : 100,
                done : true,
                }
            ],
            workers: [
                {
                workerName: "Mauricio",
                workerHourlyPrice: 15,
                hoursSpent : 2,
                }
            ],
            startDate : "01-01-2022",
            startAfter : "Plumbing",
            finishDate: "31-01-2022",
            },
        ]
        }
    ]
    }
]

const rooms =[

]


Drone.create(drones)
  .then((dronesFromDB) => {
    console.log("Voici tous les drones", dronesFromDB, "et la taille de la DB",dronesFromDB.length);
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log("oops", err);
  });
*/