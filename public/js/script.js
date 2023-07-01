document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("renovMaster imported successfully");
  },
  false
);

function iconClick(element) {
  let items = document.getElementsByClassName("statusIcon");
  for (let i = 0; i < items.length; i++) {
    items[i].classList.remove("active");
  }

  element.classList.add("active");
}

/* JS to listen to input change for an automatic upload of Floor plan */
const uploadPlanForm = document.querySelector(".addPhotoForm");
const uploadPlanWindow = document.querySelector(".addPhotoWindow");

if (uploadPlanWindow) {
  uploadPlanWindow.addEventListener("change", () => {
    uploadPlanForm.submit();
  });
}

/* JS to listen to input change for an automatic upload of initial Room Img */
const uploadRoomImgFormInit = document.querySelector(".addRoomImgInit");
const uploadRoomImgWindowInit = document.querySelector(".addRoomImgWindowInit");

if (uploadRoomImgWindowInit) {
  uploadRoomImgWindowInit.addEventListener("change", () => {
    uploadRoomImgFormInit.submit();
  });
}

/* JS to listen to input change for an automatic upload of initial Room Img */
const uploadRoomImgFormCurr = document.querySelector(".addRoomImgCurr");
const uploadRoomImgWindowCurr = document.querySelector(".addRoomImgWindowCurr");

if (uploadRoomImgWindowCurr) {
  uploadRoomImgWindowCurr.addEventListener("change", () => {
    uploadRoomImgFormCurr.submit();
  });
}

/* JS to listen to input change for an automatic upload of initial Room Img */
const uploadRoomImgForm3d = document.querySelector(".addRoomImg3d");
const uploadRoomImgWindow3d = document.querySelector(".addRoomImgWindow3d");

if (uploadRoomImgWindow3d) {
  uploadRoomImgWindow3d.addEventListener("change", () => {
    uploadRoomImgForm3d.submit();
  });
}

// Sort bar
document.querySelectorAll(".dropdown-el").forEach(function (dropdown) {
  dropdown.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    dropdown.classList.toggle("expanded");
    document.getElementById(e.target.getAttribute("for")).checked = true;
  });
});

document.addEventListener("click", function () {
  document.querySelectorAll(".dropdown-el").forEach(function (dropdown) {
    dropdown.classList.remove("expanded");
  });
});

// Supprimer room
let editItem = document.getElementsByClassName("editDeleteBtn2");
let deleteItem = document.getElementsByClassName("hiddenDeleteBtn");

for (let i = 0; i < editItem.length; i++) {
  editItem[i].addEventListener("click", function (event) {
    deleteItem[i].style.display = "inline";
  });
}

// Editer project info
let editProject = document.getElementById("editProjectBtn");
let projectForm = document.getElementById("projectInfoForm");
if(editProject){
  editProject.addEventListener("click", function (event) {
    projectForm.style.display = "grid";
    projectForm.style.gridTemplateColumns = "1fr 1fr 1fr";
    projectForm.style.alignItems = "flex-end";
    projectForm.style.height = "10vh";
    projectForm.style.margin = "5vh 0";
  });
}


// Editer room info
let editRoom = document.getElementById("editRoomDescriptionBtn");
let roomForm = document.getElementById("roomDescriptionForm");
if(editRoom){
  editRoom.addEventListener("click", function (event) {
    roomForm.style.display = "inline";
  });
}


//JS to decide if we really want to delete a project or not

const deleteProj = document.getElementById("deleteProjectBtn"); 
const deleteProjYes = document.getElementById("doIt");
const deleteProjNo = document.getElementById("dont");

if (deleteProj) {
  deleteProj.addEventListener("click", function () {
    document.getElementById("deleteProject").setAttribute("class", "visible");
    console.log("click on DeleteProjectBtn")
  });

  deleteProjYes.addEventListener("click", function () {
    deleteProjYes.submit();
  });

  deleteProjNo.addEventListener("click", function () {
    document.getElementById("deleteProject").setAttribute("class", "hidden");
  });
}

//JS to check when a task is done

const checkForm = document.querySelectorAll(".checkTask");
const checkBox = document.querySelectorAll(".checkbox");
console.log("checkBox: ",checkBox)
console.log("checkForm: ",checkForm)
let count = 0

checkBox.forEach(function(el,i) {
  el.addEventListener("change", function () {
    checkForm[i].submit();
    console.log("case checked!")
  });
})