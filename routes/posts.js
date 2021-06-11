const { json } = require("body-parser");
const { timeStamp } = require("console");
const express = require("express");
const path = require("path");
const router = express.Router();

module.exports = (db) => {
  router.get("/:id/fav", (req, res) => {
    post_id = req.params.id;
    let select_query = `SELECT favourite FROM posts 
                        WHERE id = $1;`;

    const values = [post_id];

    db.query(select_query,values)
      .then((data) => {
        // console.log("rowsssssssssss",(data.rows[0]))

        res.status(200).json(data.rows[0]);
      })
      .catch((err) => {
        console.log("error:", err);
        res.status(500).json({ error: err.message });
      });
  });

  router.put("/:id/fav", (req, res) => {
    console.log("hey", req.body);
    console.log(req.params.id);
    post_id = req.params.id;
    fav_val = req.body.status;

    let select_query = `UPDATE posts 
                        Set favourite = $2 
                        WHERE id = $1
                        returning favourite ;`;

    const values = [post_id, fav_val];

    db.query(select_query, values)
      .then((data) => {
        // console.log("rowsssssssssss", data.rows[0]);

        res.status(200).json(data.rows);
      })
      .catch((err) => {
        console.log("error:", err);
        res.status(500).json({ error: err.message });
      });
  });

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

  router.post("/", async (req, res) => {
    let sampleFile;
    let uploadPath;
    //Trying to capture all the files and put them into some kind of ARRAY
    let image_path = [];

    if (req.files && req.files.images && Array.isArray(req.files.images)) {
      for (const image of req.files.images) {
        sampleFile = image;

        uploadPath = path.join(
          __dirname,
          "../",
          "public/uploads/",
          sampleFile.name
        );
        image_path.push(sampleFile.name);
        try {
          await sampleFile.mv(uploadPath);
        } catch (err) {
          return res.status(500).send(err);
        }
      }
    } else if (req.files && req.files.images) {
      sampleFile = req.files["images"];
      uploadPath = path.join(
        __dirname,
        "../",
        "public/uploads/",
        sampleFile.name
      );
      image_path.push(sampleFile.name);
      try {
        await sampleFile.mv(uploadPath);
      } catch (err) {
        return res.status(500).send(err);
      }
    } else {
      image_path = null;
    }
    // console.log(uploadPath);
    //Trying to capture all the files and put them into some kind of ARRAY
    // console.log("hey")

    const post = req.body.message;
    const code = req.body.code;
    const tags = JSON.stringify(req.body.tags);
    const newImagePath = image_path ? JSON.stringify(image_path) : "null";
    const redirect_code = req.body.redirect_code;

    let query = `INSERT INTO posts
                  (user_id, image_url,tags, post_text, code,redirect_code,total_comments)
                  VALUES($1,$2,$3,$4,$5,$6,$7)                  
                  returning *`;

    const values = [2, newImagePath, tags, post, code,redirect_code, 5 ];

    db.query(query, values)
      .then((data) => {
        // console.log(data.rows[0])
        res.status(200).json(data.rows[0]);
      })
      .catch((err) => {
        // console.log("error3");
        // console.log("error:", err);
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
