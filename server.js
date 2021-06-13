require("dotenv").config();
const express = require("express");
const fileUpload = require('express-fileupload');
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
// const fileupload = require(express-fileupload)
const { Pool } = require('pg');
const client = require('./db/db');
const db = new Pool(client);
db.connect();
app.use(fileUpload());
app.use(express.static('public'))

// const { Pool } = require('pg');
// const dbParams = require('./lib/db.js');
// const db = new Pool(dbParams);
// db.connect();

const corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));



const postsRoutes = require("./routes/posts");
const commentsRoutes = require("./routes/comments");
const searchRoutes = require("./routes/search");



app.use("/post", postsRoutes(db));
app.use("/comment", commentsRoutes(db));
app.use("/search", searchRoutes(db));


const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});