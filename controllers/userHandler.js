const { User } = require("../model/userModel");

// here we need to implement all controllers

async function handleGetAllUsers(req, res) {
  // running the mongodb query to fetch all data present in the database
  const allDBUsers = await User.find({});
  return res.json(allDBUsers);
}

async function handleGetSpecificUser(req, res) {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found in Database" });
  }
  return res.json(user);
}

const handleCreateUser = async (req, res) => {
  // for now we are using body data passed through postman to create user inside mongodb
  const body = req.body;
  /*
          Here I was receiving an error related to body parsing which made me realise a body parser middleware is required
          to send request from POSTMAN to app
      */
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.job_title ||
    !body.gender ||
    !body.email
  ) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    jobTitle: body.job_title,
    gender: body.gender,
    email: body.email,
  });

  console.log("result", result);

  return res.status(201).json({ msg: "User added successfully" });
};

const handleDeleteUserById = async (req, res) => {
  const id = req.params.id;
  console.log("id for the user", id);
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: err.message });
  }
};

const handleUpdateUser = async (req, res) => {
  const id = req.params.id;
  const user = User.findById(id);

  if (!user) {
    return res.status(404).json({ message: "User not found to update" });
  }

  await User.findByIdAndUpdate(req.params.id, { firstName: "Manual" });
  return res.json({ status: "Successfully changed for id ", id });
};

module.exports = {
  handleGetAllUsers,
  handleGetSpecificUser,
  handleCreateUser,
  handleDeleteUserById,
  handleUpdateUser
};
