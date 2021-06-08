require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const { Pool } = require('pg');
const client = require('./db/db');
const db = new Pool(client);
db.connect();

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

// simple route


// Respond to POST request on the root route (/), the application’s home page:

const postsRoutes = require("./routes/posts");
// const productRoutes = require("./routes/products");
// const widgetsRoutes = require("./routes/widgets");
// const loginRoutes = require("./routes/login");
// const uploadRoutes = require("./routes/upload");
// const viewRoutes = require("./routes/view");
// const heartRoutes = require("./routes/heart");

console.log("post routes ",postsRoutes);
app.use("/post", postsRoutes(db));

// app.use("/products", productRoutes(db));
// app.use("/api/widgets", widgetsRoutes(db));
// app.use("/upload", uploadRoutes(db));
// app.use("/heart", heartRoutes(db));
// app.use("/login", loginRoutes(db));

// app.post("/post", (req, res) => {
//   console.log("data",req.body)
//   res.json({ message: "Welcome to Codagram application." });
//  });








// // Respond to a PUT request to the /user route:
// app.put('/user', function (req, res) {
//   res.json(res.data)
// })
// // Respond to a DELETE request to the /user route:
// app.delete('/user', function (req, res) {
//   res.json('Got a DELETE request at /user')
// })

// // set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});