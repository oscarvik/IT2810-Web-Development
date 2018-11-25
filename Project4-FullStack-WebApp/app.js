const express = require("express");
const mongoose = require("mongoose");

const users = require("./routes/api/users");
const movies = require("./routes/api/movies");
const genres = require("./routes/api/genres");


const app = express();

// Built-in replacement for the body-parser
app.use(express.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true } )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Use Routes
app.use("/api/users", users);
app.use("/api/movies", movies);
app.use("/api/genres", genres);

module.exports = app;