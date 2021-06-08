const { json } = require("body-parser");
const express = require("express");
const path = require("path");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {});

  router.post("/", (req, res) => {
    console.log("bodyyyyyyyy",req.body);
    let sampleFile;
    let uploadPath;
    //Trying to capture all the files and put them into some kind of ARRAY
    const image_path = [];
    if (Array.isArray(req.files.images)) {
      req.files.images.map((image) => {
        sampleFile = image;

        uploadPath = path.join(__dirname, "../", "uploads/", sampleFile.name);
        image_path.push(sampleFile.name);
        sampleFile.mv(uploadPath, function (err) {
          if (err) return res.status(500).send(err);
        });
      });
    } else {
      sampleFile = req.files["images"];
      console.log("samplefile............", sampleFile);

      uploadPath = path.join(__dirname, "../", "uploads/", sampleFile.name);
      image_path.push(sampleFile.name);
      sampleFile.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);
      });
    }

    //Trying to capture all the files and put them into some kind of ARRAY
    const post = req.body.message;
    const tags = JSON.stringify(req.body.tags);
    const newImagePath = JSON.stringify(image_path);

    let query = `INSERT INTO posts
                  (user_id, image_url,tags, post_text, total_likes,total_comments, parent_post_id)
                  VALUES($1,$2,$3,$4,$5,$6,$7)`;

    const values = [1, newImagePath, tags, post, 5, 5, 1];

    db.query(query, values)
      .then(() => {
        res.status(200).json({ message: "record inserted" });
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
