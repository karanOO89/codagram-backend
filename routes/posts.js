const { json } = require("body-parser");
const { timeStamp } = require("console");
const express = require("express");
const path = require("path");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let select_query = `SELECT * FROM posts;`;

    db.query(select_query)
      .then((data) => {
        // console.log("rowsssssssssss",(data.rows[0]["image_url"]))

        res.status(200).json(data.rows);
      })
      .catch((err) => {
        console.log("error:", err);
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {
    let sampleFile;
    let uploadPath;
    //Trying to capture all the files and put them into some kind of ARRAY
    let image_path = [];

    if (req.files && req.files.images && Array.isArray(req.files.images)) {
      req.files.images.map((image) => {
        sampleFile = image;

        uploadPath = path.join(__dirname, "../", "uploads/", sampleFile.name);
        image_path.push(sampleFile.name);
        sampleFile.mv(uploadPath, function (err) {
          if (err) return res.status(500).send(err);
        });
      });
    } else if (req.files && req.files.images) {
      sampleFile = req.files["images"];
      uploadPath = path.join(
        __dirname,
        "../",
        "public/uploads/",
        sampleFile.name
      );
      image_path.push(sampleFile.name);
      sampleFile.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);
      });
    } else {
      image_path = null;
    }
    // console.log(uploadPath);
    //Trying to capture all the files and put them into some kind of ARRAY
    const post = req.body.message;
    const code = req.body.code;
    const tags = JSON.stringify(req.body.tags);
    const newImagePath = image_path ? JSON.stringify(image_path) : "null";

    let query = `INSERT INTO posts
                  (user_id, image_url,tags, post_text, code,total_likes,total_comments, parent_post_id)
                  VALUES($1,$2,$3,$4,$5,$6,$7,$8) 
                  returning *`;

    const values = [1, newImagePath, tags, post, code, 5, 5, 1];

    db.query(query, values)
      .then((data) => {
        res.status(200).json(data.rows[0]);
      })
      .catch((err) => {
        console.log("error:", err);
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};



// let tempImage = image_path;
// let myString = "";
// for (let t = 0; t < tempImage.length; t++) {
//   if (t === tempImage.length - 1) {
//     myString += tempImage[t];
//   } else {
//     myString += tempImage[t] + ", ";
//   }
// }
// let tempImage = image_path;
// for (let i = 0; i < tempImage.length; i++) {
//   if (i === tempImage.length - 1) {
//     myString += tempImage[i];
//   } else {
//     myString += tempImage[i] + ", ";
//   }
// }
// console.log("rohits code the image ", myString);
