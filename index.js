const express = require("express");
const {connectMongoDB} = require("./connection/connectDB");


// app is basically a httpServer --> which has routes and handlers as parameters
const app = express();

// Importing mock data for testing --> This was for testing purpose
// Later on we are using mongodb and adding data manually
const users = require("./MOCK_DATA.json");

// NodeJS server will be running on this port
const PORT = 8000;

// connecting the app with mongoDB locally
const url = "mongodb://127.0.0.1:27017/serverbackend";
connectMongoDB(url);

// adding body parser middleware to execute requests
app.use(express.urlencoded({extended: false}));


// adding routers for import using express
const userRouter = require("./routes/user");
app.use("/user", userRouter);


app.listen(PORT, () => {
    console.log(`Server Started on PORT: ${PORT}`);
})