const express = require("express");
const { User } = require("../model/userModel");

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
  return res.json({ message: "Succeded to connect with /user"});
});

router.get("/read", async (req, res) => {
  // running the mongodb query to fetch all data present in the database
  const allDBUsers = await User.find({});
  return res.json(allDBUsers);
});

router.route("/read:id").get(async(req, res) =>{
    const userById = await User.findById(req.params.id);
    if(!userById) return res.status(404).json({error: "user not found"});
    return res.json(userById);
});

router.post("/create", async(req, res) =>{
    // for now we are using body data passed through postman to create user inside mongodb
    const body = req.body;
    /*
        Here I was receiving an error related to body parsing which made me realise a body parser middleware is required
        to send request from POSTMAN to app
    */
    if(!body || !body.first_name || !body.last_name || !body.job_title || !body.gender || !body.email){
        return res.status(400).json({msg: "All fields are required"})
    }

    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        jobTitle: body.job_title,
        gender: body.gender,
        email: body.email
    })

    console.log("result", result);

    return res.status(201).json({msg: "User added successfully"})
})

module.exports = router;