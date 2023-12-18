const express = require("express");
const shortid = require("shortid");
const createHttpError = require("http-errors");
const mongoose = require("mongoose");
const Shorturl = require("./models/url.model");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
mongoose
  .connect("mongodb://localhost:27017", {
    dbName: "url-shortner",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongoose connected Successfully");
  })
  .catch((error) => {
    console.log(error.message);
  });

app.get("/", (req, res) => {
  res.send("Welcome to ");
});

app.post("/",  async (req, res, next) => {
  try {
    const {url } = req.body;
    if (!url) {
      throw  createHttpError.BadRequest('Provide a valid url');
    }
    const urlExist = await Shorturl.findOne({url});
    
  } catch (error) {
    next(error);
  }
});

app.use((req, res, next) => {
  next(createHttpError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
});
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`APP IS LISTNING ON ${port}`);
});
