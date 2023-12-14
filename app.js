const express = require("express");
const shortid = require("shortid");
const createHttpError = require("http-errors");
const mongoose = require("mongoose");
const app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: false}))
mongoose.connect("mongodb://localhost:27017" , {
  dbName: 'url-shortner',
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.get("/", (req, res) => {
  res.send("Welcome to ");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`APP IS LISTNING ON ${port}`);
});
