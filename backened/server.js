const express = require("express");
const cors = require("cors");
//mongoose is required to connect to mongodb database
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
//To include env variable file
const port = process.env.PORT || 5000;

//Cors() middelwr which will allow to parse json object
app.use(cors());
app.use(express.json());

//Connection string is available from atlas mongodb and is included in Atlas_uri variable
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongodb database connection was successful");
});

//Require routes files
const excercisesRouter = require("./routes/excercises");
const usersRouter = require("./routes/users");

//Uses the routes files created to perform CRUD on database
app.use("/excercises", excercisesRouter);
app.use("/users", usersRouter);

//Starts the server
app.listen(port, () => {
  console.log(`Server is running on PORT : ${port}`);
});
