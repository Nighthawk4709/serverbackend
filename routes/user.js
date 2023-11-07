const express = require("express");
const { handleGetAllUsers, handleGetSpecificUser, handleCreateUser, handleDeleteUserById, handleUpdateUser } = require("../controllers/userHandler")

// Implementation of routes of user are present here which will be further send into
/*
    1. create --> /user/create --> create user and send that to db
    2. read --> /user/read --> reading all user in db
    3. update --> /user/update:id --> edit a specific user
    4. delete --> /user/delete:id --> delete specfic user from db
    5. specific read --> /user/read:id --> details of a specific user
*/

const router = express.Router();
/*
    here router.get("/") means whenever the request will come on /user
*/

router.get("/", async (req, res) => {
  // return a table showing CRUD and give the client an option to interact and see CRUD happening
  return res.json({ message: "Succeded to connect with /user" });
});

router.get("/read", handleGetAllUsers);

router.get("/read/:id", handleGetSpecificUser); 

router.post("/create", handleCreateUser);

router.delete("/delete/:id", handleDeleteUserById);

router.patch("/update/:id", handleUpdateUser);


module.exports = router;
