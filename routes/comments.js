const express = require("express");
const router = express.Router();
const path = require("path");

module.exports = (db) => {



  router.get("/:id/favComment", (req, res) => {
    const id = req.params.id;
    console.log(id)
    let select_query = `SELECT post_comments.post_id, post_comments.id, post_comments.comment ,post_comments.votes 
                        FROM post_comments 
                        JOIN posts ON post_comments.post_id = posts.id
                        WHERE posts.id = $1 AND post_comments.votes >= 
                        (SELECT MAX(post_comments.votes) FROM post_comments
                        WHERE post_comments.post_id = $1)`
    values = [id];
    db.query(select_query, values)
      .then((data) => {
        console.log("rowsssssssssss",(data.rows[0]))

        res.status(200).json(data.rows[0]);
      })
      .catch((err) => {
        console.log("error:", err);
        res.status(500).json({ error: err.message });
      });
  });




  router.get("/:id", (req, res) => {
    // console.log("hey")
    const id = req.params.id;
    let select_query = `SELECT * FROM post_comments
                        WHERE post_id = $1 ;`;
    values = [id];
    db.query(select_query, values)
      .then((data) => {
        console.log("rowsssssssssss",(data.rows))

        res.status(200).json(data.rows);
      })
      .catch((err) => {
        console.log("error:", err);
        res.status(500).json({ error: err.message });
      });
  });
  router.post("/:id", (req, res) => {
    // console.log(req.files)
    let sampleFile;
    let uploadPath;
    //     //Trying to capture all the files and put them into some kind of ARRAY
    let image_path = [];

    if (req.files && req.files.images && Array.isArray(req.files.images)) {
      req.files.images.map((image) => {
        sampleFile = image;

        uploadPath = path.join(
          __dirname,
          "../",
          "/public/commentUploads/",
          sampleFile.name
        );
        image_path.push(sampleFile.name);
        sampleFile.mv(uploadPath, function (err) {
          if (err) {
            console.log("eroor1");
            return res.status(500).send(err);
          }
        });
      });
    } else if (req.files && req.files.images) {
      sampleFile = req.files["images"];
      uploadPath = path.join(
        __dirname,
        "../",
        "/public/commentUploads/",
        sampleFile.name
      );
      image_path.push(sampleFile.name);
      sampleFile.mv(uploadPath, function (err) {
        if (err) {
          console.log("eroor2");
          return res.status(500).send(err);
        }
      });
    } else {
      image_path = null;
    }
    //     //Trying to capture all the files and put them into some kind of ARRAY
    const comment = req.body.message;
    const code = req.body.code;
    const post_id = Number(req.params.id);
    //     const tags = JSON.stringify(req.body.tags);
    const newImagePath = image_path ? JSON.stringify(image_path) : "null";

    let query = `INSERT INTO post_comments
                  (user_id, post_id,comment,code,image_url)
                  VALUES($1,$2,$3,$4,$5) 
                  returning *`;

    const values = [1, post_id, comment, code, newImagePath];

    db.query(query, values)
      .then((data) => {
        // console.log("hey there its then ")
        res.status(200).json(data.rows[0]);
      })
      .catch((err) => {
        console.log("error:", err);
        res.status(500).json({ error: err.message });
      });
  });
  router.put("/:id", async (req, res) => {
    // console.log(req.body,req.params)

    const vote = req.body.vote;
    const vote_state = req.body.vote_state;
    const comment_id = Number(req.params.id);
    
    let query = `UPDATE post_comments 
                 SET votes = $1,vote_state = $3
                 WHERE id = $2
                 returning *`;

    const values = [vote, comment_id, vote_state];

    await db
      .query(query, values)
      .then((data) => {
        reqData = {
          votes: data.rows[0]["votes"],
          vote_state: data.rows[0]["vote_state"],
        };
        // console.log("hey there its then ",data.rows[0])
        res.status(200).json(reqData);
      })
      .catch((err) => {
        console.log("error:", err);
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
// `SELECT post_comments.post_id,post_comments.id,post_comments.votes FROM post_comments 
// JOIN posts ON post_id = posts.id
// WHERE posts.id=1 and post_comments.votes >= 
// (SELECT MAX(post_comments.votes) FROM post_comments
// WHERE post_id = 1);`