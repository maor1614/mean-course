const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");

const cors = require("cors");

const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");



mongoose
  .connect(
    "mongodb+srv://maor:X9pAlncO4bJlIn5I@cluster0.xazx4.mongodb.net/node-angular?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("connected to database");
  }) 
  .catch(() => {
    console.log("connection failed");
  });
  mongoose.set('useNewUrlParser', true);
  mongoose.set("useFindAndModify", false);
  mongoose.set("useCreateIndex", true);
  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));
app.use(cors());



app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type,Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,PUT,DELETE,OPTIONS"
  );
  next();
});
app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);



//X9pAlncO4bJlIn5I

module.exports = app;
