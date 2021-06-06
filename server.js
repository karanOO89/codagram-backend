require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Codagram application." });
});
// Respond to POST request on the root route (/), the application’s home page:
app.post('/', function (req, res) {
  res.json('Got a POST request')
})
// Respond to a PUT request to the /user route:
app.put('/user', function (req, res) {
  res.json('Got a PUT request at /user')
})
// Respond to a DELETE request to the /user route:
app.delete('/user', function (req, res) {
  res.json('Got a DELETE request at /user')
})

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});